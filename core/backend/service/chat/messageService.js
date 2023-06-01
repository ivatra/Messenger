const { MessageMeta } = require("../../database/postqre/models/messageModel");
const { User } = require("../../database/postqre/models/userModel");
const messageQueries = require("../../database/postqre/queries/messageQueries");
const attachementService = require("../chat/attachementService")
const fileService = require("../misc/fileService");
const chatService = require("./chatService");


class MessageService {
    async fetchMessages(userId, chatId, limit, offset) {
        await chatService.checkForMemberingInChat(userId, chatId)

        const { count, rows: messages } = await messageQueries.receiveByChat(chatId, userId, limit, offset)

        for await (var message of messages) {
            if (userId !== message.senderId) {
                const msgMeta = await MessageMeta.findOne({ where: { messageId: message.id } })
                if (msgMeta) {
                    message.dataValues.isRead = msgMeta.isRead
                    message.dataValues.isMentioned = msgMeta.isMentioned
                }
            } else {
                message.dataValues.isMentioned = false
            }
        }


        return { data: messages, count: count }
    }

    async fetchByMessages(userId, chatId, limit, msgIndex) {
        const { count, rows: messages } = await messageQueries.receiveByMessage(limit, chatId, msgIndex)
        return { data: messages, count: count }
    }

    async createMessage(content, attachement, senderId, chatId) {
        const message = await messageQueries.createMessage(chatId, content, senderId)
        if (attachement) {
            const fileName = await fileService.saveFile(attachement, attachement.name, 'attachements')
            const fileType = await fileService.getFileType(attachement.name)
            attachement = await attachementService.create(fileType, fileName, message.id)
        }


        return attachement ? { ...message.dataValues, attachement: attachement.dataValues } : message.dataValues
    }

}

module.exports = new MessageService()