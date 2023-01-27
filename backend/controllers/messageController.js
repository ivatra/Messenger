const messageService = require("../service/chat/messageService")
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

        const message = await messageService.createMessage(content,attachement,req.user.id, chatId)
        return res.json(message)
    }
}

module.exports = new messageController