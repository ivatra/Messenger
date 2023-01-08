const attachementService = require("../service/attachementService")

class attachementController {
    async getAll(req, res) {
        const chatId = req.params.id
        const messages = await attachementService.fetch(chatId, req.limit, req.offset)
        return res.json(messages)
    }

    async getOne(req, res) {
        const chatId = req.params.id
        const messages = await attachementService.fetchOne(chatId, req.limit, req.offset)
        return res.json(messages)
    }

    async create(req, res) {
        const { content } = req.body
        content.userId = req.user.id
        const message = await attachementService.create(content)
        return res.json(message)
    }
}

module.exports = new attachementController