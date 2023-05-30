const inboxQueries = require('../queries/inboxQueries');
const chatQueries = require('../queries/chatQueries');
const eventsQueries = require('../../mongo/queries/eventsQueries');

const { Message } = require('../models/messageModel');
const attachementsQueries = require('../queries/attachementsQueries');
const messageQueries = require('../queries/messageQueries');
const stringService = require('../../../service/misc/stringService');
const userQueries = require('../queries/userQueries');

const checkForMention = async (message, userLogins) => {
  let mentionedUsers = [];
  const words = message.split(' ');

  for (let word of words) {
    if (word.startsWith('@')) {
      word = word.slice(1);
      if (word === 'all') {
        return userLogins;
      } else if (userLogins.includes(word)) {
        mentionedUsers.push(word);
      }
    }
  }
  return mentionedUsers;
}

async function getMessageAttachements(messageId) {
  const attachement = await attachementsQueries.receiveByMessage(messageId)
  return attachement ? attachement.dataValues : null
}

function assignAttachementToMessage(attachement, message) {
  return Object.assign({}, message, { attachment: attachement });

}
async function sendMessageReceivedEvent(message) {
  const users = await chatQueries.receiveParticipantsByChat(message.chatId)
  const user = await userQueries.receiveUserById(message.senderId)
  const senderLogin = user.login

  const loginArray = users
    .map(obj => obj.user.login)
    .filter((login) => login !== senderLogin)

  const mentionedUsers = await checkForMention(message.content, loginArray)

  const attachement = await getMessageAttachements(message.id)
  const messageWithAttachement = assignAttachementToMessage(attachement, message.dataValues)

  const promises = users.map(async (user) => {
    const { id: participantId, login } = user.user;
    const userMentioned = mentionedUsers.includes(login);

    if (message.senderId !== participantId) {
      await inboxQueries.updateUnreadMsgs(participantId, message.chatId, 'increment')

      const meta = await messageQueries.createMessageMeta(message.id, participantId, userMentioned)

      await eventsQueries.createReceivedMessageEvent(participantId,
        { ...messageWithAttachement, isMentioned: userMentioned },
        messageWithAttachement.chatId,
        userMentioned)
    }


    await inboxQueries.updateMessage(participantId, message.chatId, message.id)
  });
  await Promise.all(promises);
}

async function createMessagesVector(messageId, filteredMessage) {
  await messageQueries.createMessageVector(messageId, filteredMessage)

}
const declareMessageTrigger = async () => {
  Message.addHook('afterCreate', async (message) => {
    await sendMessageReceivedEvent(message)

    const filteredMessage = stringService.
      removePunctuation(message.content).
      toLowerCase()

    await createMessagesVector(message.id, filteredMessage)
  });
  Message.addHook('beforeCreate', async (message, options) => {
    const lastMessage = await Message.findOne({
      where: { chatId: message.chatId },
      order: [['index', 'DESC']],
    });

    if (lastMessage) {
      message.index = lastMessage.index + 1;
    } else {
      message.index = 0;
    }
  });
}

module.exports = declareMessageTrigger();