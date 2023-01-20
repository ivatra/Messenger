const messageQueries = require("../database/postqre/queries/messageQueries");
const attachementService = require("../service/attachementService")
const fileService = require("../service/fileService")

class MessageService {
    async fetchMessages(chatId, limit, offset) {
        return await messageQueries.receiveByChat(chatId, limit, offset)
    }

    async createMessage(content, attachement, senderId, chatId) {
        const message = await messageQueries.createMessage(chatId, content, senderId)
        if (attachement) {
            const fileName = await fileService.saveAttachement(attachement, attachement.name)
            const fileType = await fileService.getFileType(attachement.name)
            attachement = await attachementService.create(fileType, fileName, message.id)
        }
        return { message, attachement }
    }

}

module.exports = new MessageService()