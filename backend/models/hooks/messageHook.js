const { Message } = require('../../models/messageModel')
const { InBox } = require('../../models/inBoxModel')
const { ChatParticipant } = require('../../models/chatModel')
const mongo_client = require('../../mongo')

const events = mongo_client.db().collection('events')

async function getUsersInChat(chat, sender) {
  const users = await ChatParticipant.findAll({
    attributes: 'userId',
    where: {
      userId: {
        $not: sender
      },
      chatId: chat
    }
  })
  return users
}

async function sendMessageReceivedEvent() {
  Message.addHook('afterCreate', async (message) => {
    const users = await getUsersInChat(message.chatId, message.senderId)
    users.forEach(async (userId) => {
      var event = {
        recipient_id: userId,
        type: "Received Message",
        content: {
          messageId: message.id
        },
        notify: true,
        sent: false
      }
      await events.insertOne(event)

      await InBox.update({ messageId: message.id }, {
        where: {
          chatId: message.chatId
        }
      })
    })
  })
}


module.exports = sendMessageReceivedEvent