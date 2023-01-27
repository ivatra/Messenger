const messageQueries = require("../../database/postqre/queries/messageQueries");
const attachementService = require("../chat/attachementService")
const fileService = require("../misc/fileService")

class MessageService {
    async fetchMessages(chatId, limit, offset) {
        return await messageQueries.receiveByChat(chatId, limit, offset)
    }

    async createMessage(content, attachement, senderId, chatId) {
        const message = await messageQueries.createMessage(chatId, content, senderId)
        if (attachement) {
            const fileName = await fileService.saveFile(attachement, attachement.name,'attachements')
            const fileType = await fileService.getFileType(attachement.name)
            attachement = await attachementService.create(fileType, fileName, message.id)
        }
        return { message, attachement }
    }

}

module.exports = new MessageService()