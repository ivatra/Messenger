const messageService = require("../service/messageService")
const uuid = require('uuid')
const mime = require('mime-types')
const path = require('path')
const attachementService = require("../service/attachementService")
const fileHandler = require("../service/fileHandler")
const { Message, Attachement } = require("../models")

class messageController {
    async getAll(req, res) {
        const chatId = req.params.id
        const messages = await messageService.fetchMessages(chatId, req.limit, req.offset)
        return res.json(messages)
    }

    async create(req, res) {
        const { content } = req.body
        const { attachement } = req.files
        const { chatId } = req.params.id
        var attachementId

        if (attachement) {
            const fileName = await fileHandler.saveAttachement(attachement, attachement.name)
            const fileType = await fileHandler.getFileType(attachement.name)
            const { id } = await attachementService.create(fileType, fileName)
            attachementId = id
        }
        const message = await messageService.createMessage(content, attachementId, req.user.id, chatId)
        return res.json(message)
    }
}

module.exports = new messageController