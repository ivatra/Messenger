const inboxQueries = require('../queries/inboxQueries');
const chatQueries = require('../queries/chatQueries');
const eventsQueries = require('../../mongo/queries/eventsQueries');

const { Message } = require('../models/messageModel');
const attachementsQueries = require('../queries/attachementsQueries');
const messageQueries = require('../queries/messageQueries');
const stringService = require('../../../service/misc/stringService');

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
  const loginArray = users.map(obj => obj.user.login);
  const mentionedUsers = await checkForMention(message.content, loginArray)

  const promises = users.map(async (user) => {
    const { id, login } = user.user;
    const userMentioned = mentionedUsers.includes(login);

    const attachement = await getMessageAttachements(message.id)
    const messageWithAttachement = assignAttachementToMessage(attachement, message.dataValues)

    if (message.senderId !== id)
      await eventsQueries.createReceivedMessageEvent(id, {...messageWithAttachement,isMentioned:userMentioned})

    await inboxQueries.updateMessage(id, message.chatId, message.id)
  });
  await Promise.all(promises);
}

async function createMessagesVector(messageId,filteredMessage) {
  await messageQueries.createMessageVector(messageId,filteredMessage)

}
const declareMessageTrigger = async () => {
  Message.addHook('afterCreate', async (message) => {
    await sendMessageReceivedEvent(message)

    const filteredMessage = stringService.
      removePunctuation(message.content).
      toLowerCase()

    await createMessagesVector(message.id,filteredMessage)
  });
}

module.exports = declareMessageTrigger();