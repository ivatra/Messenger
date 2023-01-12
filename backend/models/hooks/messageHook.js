const { Message } = require('../../models/messageModel');
const { InBox } = require('../../models/inBoxModel');
const { ChatParticipant, Chat } = require('../../models/chatModel');
const mongoClient = require('../../mongo');
const { User } = require('../userModel');
const getMessageReceivedEvent = require('./eventCreator');

const events = mongoClient.db('Messenger').collection('events');

const getUsersInChat = async (chatId) => {
  const chatParticipants = await ChatParticipant.findAll({
    attributes: ['userId'],
    where: { chatId },
    include: {
      model: User,
      attributes: ['id', 'login']
    }
  });
  return chatParticipants;
}

const updateInbox = async (messageId, userId, chatId) => {
  await InBox.update({ messageId }, {
    where: {
      userId,
      chatId
    }
  });
}

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

const sendMessageReceivedEvent = async () => {
  Message.addHook('afterCreate', async (message) => {
    const users = await getUsersInChat(message.chatId);
    const loginArray = users.map(obj => obj.user.login);
    const mentionedUsers = await checkForMention(message.content, loginArray)

    const promises = users.map(async (user) => {
      const { id, login } = user.user;
      const userMentioned = mentionedUsers.includes(login);
      const event = getMessageReceivedEvent(id, message.id, userMentioned);
      
      if (message.senderId !== id) {
        await events.insertOne(event);
      }
      await updateInbox(message.id, id, message.chatId);
    });
    await Promise.all(promises);
  });
}

module.exports = sendMessageReceivedEvent();