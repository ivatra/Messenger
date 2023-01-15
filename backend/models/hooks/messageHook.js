const { Message } = require('../../models/messageModel');
const { InBox } = require('../../models/inBoxModel');
const { ChatParticipant, Chat } = require('../../models/chatModel');
const mongoClient = require('../../mongo');
const { User } = require('../userModel');
const inboxHook = require('./inboxHook');
const eventCreator = require('../../events/eventCreator');
const { Attachement } = require('../attachementModel');

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
  const inbox = await InBox.findOne({
    where: {
      userId,
      chatId
    }
  });
  inbox.messageId = messageId
  await inbox.save()
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

async function getMessageAttachements(messageId) {
  const message = await Message.findByPk(messageId, {
    attributes: ['id'],
    include: {
      model: Attachement,
      attributes: ['type', 'url']
    }
  })
  return message.attachement.dataValues
}

function assignAttachementToMessage(attachement, message) {
  return Object.assign({}, message, { attachment: attachement });

}
const sendMessageReceivedEvent = async () => {
  Message.addHook('afterCreate', async (message) => {
    const users = await getUsersInChat(message.chatId);
    const loginArray = users.map(obj => obj.user.login);
    const mentionedUsers = await checkForMention(message.content, loginArray)

    const promises = users.map(async (user) => {
      const { id, login } = user.user;
      const userMentioned = mentionedUsers.includes(login);

      setTimeout(async () => {
        const attachement = await getMessageAttachements(message.id)
        const messageWithAttachement = assignAttachementToMessage(attachement, message.dataValues)

        const event = eventCreator.createMessageEvent(id, messageWithAttachement, userMentioned);
        
        if (message.senderId !== id)
          await events.insertOne(event);
      }, 1000)

      await updateInbox(message.id, id, message.chatId);
    });
    await Promise.all(promises);
  });
}

module.exports = sendMessageReceivedEvent();