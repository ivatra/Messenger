const messageQueries = require("../../database/postqre/queries/messageQueries");
const attachementService = require("../chat/attachementService")
const fileService = require("../misc/fileService");
const chatService = require("./chatService");

class MessageService {
    async fetchMessages(userId, chatId, limit, offset) {
        await chatService.checkForMemberingInChat(userId,chatId)
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