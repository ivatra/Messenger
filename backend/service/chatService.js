const ApiError = require('../error/ApiError');
const { User, Contact } = require('../models')
const { Sequelize } = require('sequelize')
const { Chat, GroupChat, IndividualChat, ChatParticipant } = require('../models/chatModel')

class ChatService {
  async createChat(userId, userId2, chatType) {
    if (chatType !== "group" && chatType !== "individual") {
      throw ApiError.badRequest("Incorrect chat type ")
    }

    const chatData = { type: chatType }
    const chatModel = chatType === "group" ? GroupChat : IndividualChat
    const { id } = await chatModel.create()
    chatData[`${chatType}ChatId`] = id
    const chat = await Chat.create(chatData)
    await ChatParticipant.create({ chatId: chat.id, userId: userId })
    if (userId2) {
      await ChatParticipant.create({ chatId: chat.id, userId: userId2 })
    }
    return chat
  }

  async findChat(userId1, userId2) {
    return await Chat.findAll({
      where: {
        '$participants.userId$': userId1,
        '$participants.userId$': userId2,
        type: "individual"
      },
      attributes: ['id'],
      include: [
        {
          model: ChatParticipant,
          as: 'participants',
          attributes:['userId']
        }
      ],
    });
  }
}

// async findChat(userId1, userId2) {
//   return await Chat.findAll({
//     where: {
//       '$participants.userId$': userId1,
//       '$participants.userId$': userId2,
//       type: "individual"
//     },
//     attributes: ['id'],
//     include: [
//       {
//         model: ChatParticipant,
//         as: 'participants',
//         attributes:['userId']
//       },
//       {
//         model: IndividualChat,
//         attributes: ['isActive']
//       }
//     ],
//   });
// }
//}
module.exports = new ChatService()