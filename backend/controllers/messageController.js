const messageService = require("../service/messageService")
const attachementService = require("../service/attachementService")
const fileService = require("../service/fileService")
const { Message } = require("../models")

class messageController {
    async getAll(req, res) {
        const chatId = req.params.chatId
        const messages = await messageService.fetchMessages(chatId, req.limit, req.offset)
        return res.json(messages)
    }

    async create(req, res) {
        const { content } = req.body
        const { attachement } = req.files || false
        const chatId = req.params.chatId
        var attachementId

        const message = await messageService.createMessage(content, attachementId, req.user.id, chatId)
        
        if (attachement) {
            const fileName = await fileService.saveAttachement(attachement, attachement.name)
            const fileType = await fileService.getFileType(attachement.name)
            await attachementService.create(fileType, fileName,message.id)
        }
        return res.json(message)
    }
}

module.exports = new messageController