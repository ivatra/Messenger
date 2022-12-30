const sequelize = require('../db')
const mongo_client = require('../mongo')

const events = mongo_client.db().collection('events')

const {
  Chat,
  Contact,
  GroupChat,
  IndividualChat,
  Message,
  Attachement,
  ChatParticipants,
  InBox,
  MessageRead
} = require('./models')

async function getUsersInChat(chat, sender) {
  const users = await ChatParticipants.findAll({
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

const messageReceived = async() => {Message.addHook('afterCreate', async (message) => {
  const users = await getUsersInChat(message.chatId, message.senderId)
  users.forEach(async (userId) => {
    var event = {
      recipient_id: userId,
      type: "Received Message",
      content: {
        messageId: message.id
      },
      notify: true,
      seen: false
    }
    await events.insertOne(event)

    await InBox.update({messageId:message.id},{where:{
      chatId:message.chatId
    }})
  })

})};

const inBoxUpdated = async() => {InBox.addHook('afterUpdate', async (inbox) => {
  const countUnreadMsgs = await MessageRead.count({where:{chatId:inbox.chatId,userId:inbox.userId,isRead:false}})
  inbox.countUnreadMsgs = countUnreadMsgs
  inbox.save()
})}

const contactChanged = async() => {Contact.addHook('afterSave', async (contact) => {
  var event = {
    recipient_id: contact.recipientId,
    type: contact.status,
    content: {
      contactId: contact.id
    },
    notify: true,
    seen: false
  }
  await events.insertOne(event)
}
)}

const newChatParticipiant = async() => {ChatParticipants.addHook('afterInsert', async (participiants) => {
  const chat = await Chat.findOne({ where: { chatId: participiants.chatId } })
  if (chat.type === "Group") {
    const countOfParticipiants = await ChatParticipants.count({ where: { id: participiants.chatId } })
    await GroupChat.update({ participiantsCount: countOfParticipiants }, {
      where: {
        id: chat.groupChatId
      }
    })
  }

})}

module.exports = {
  newChatParticipiant,
  messageReceived,
  contactChanged,
  inBoxUpdated
}
