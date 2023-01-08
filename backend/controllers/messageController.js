const messageService = require("../service/messageService")

class messageController {
    async getAll(req, res) {
        const chatId = req.params.id
        const messages = await messageService.fetchMessages(chatId, req.limit,req.offset)
        return res.json(messages)
    }
    async create(req, res) {
        const { content } = req.body
        content.userId = req.user.id
        const message = await messageService.createMessage(content)
        return res.json(message)
    }
}

module.exports = new messageController