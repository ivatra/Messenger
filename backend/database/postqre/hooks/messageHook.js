const messageQueries = require('../queries/messageQueries');
const inboxQueries = require('../queries/inboxQueries');
const chatQueries = require('../queries/chatQueries');
const eventsQueries = require('../../mongo/queries/eventsQueries');

const { Message } = require('../models/messageModel');
const attachementsQueries = require('../queries/attachementsQueries');

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
const sendMessageReceivedEvent = async () => {
  Message.addHook('afterCreate', async (message) => {
    const users = await chatQueries.receiveParticipantsByChat(message.chatId)
    const loginArray = users.map(obj => obj.user.login);
    const mentionedUsers = await checkForMention(message.content, loginArray)

    const promises = users.map(async (user) => {
      const { id, login } = user.user;
      const userMentioned = mentionedUsers.includes(login);

      setTimeout(async () => {
        const attachement = await getMessageAttachements(message.id)
        const messageWithAttachement = assignAttachementToMessage(attachement, message.dataValues)

        if (message.senderId !== id)
          await eventsQueries.createMessageEvent(id, messageWithAttachement, userMentioned)
      }, 1000)

      inboxQueries.updateMessage(id, message.chatId, message.id)
    });
    await Promise.all(promises);
  });
}

module.exports = sendMessageReceivedEvent();