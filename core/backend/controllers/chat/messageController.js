const messageService = require("../../service/chat/messageService")
class messageController {
    async getAll(req, res) {
        const chatId = req.params.chatId
        const { msg_index: msgId } = req.query
        var messages
        if (msgId) {
            messages = await messageService.fetchByMessages(req.user.id, chatId, req.limit, msgId)
        } else {
            messages = await messageService.fetchMessages(req.user.id, chatId, req.limit, req.offset)
        }
        return res.json(messages)
    }
    async getOne(req, res) {
        const { msgId } = req.params

        const message = await messageService.fetchOne(req.user.id, msgId)

        return res.json(message)

    }
    async create(req, res) {
        const { content } = req.body
        const { attachement } = req.files || false
        const chatId = req.params.chatId

        const message = await messageService.createMessage(content, attachement, req.user.id, chatId)

        return res.json(message)
    }
}

module.exports = new messageController