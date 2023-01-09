const ApiError = require("../error/ApiError")
const attachementService = require("../service/attachementService")
const messageController = require("./messageController")

class attachementController {
    async getAll(req, res) {
        const chatId = req.params.chatId
        const messages = await attachementService.fetchAll(chatId, req.limit, req.offset)
        return res.json(messages)
    }

    async getOne(req, res) {
        console.log(req.params)
        const {chatId,attachId} = req.params
        const messages = await attachementService.fetchOne(chatId,attachId)
        return res.json(messages)
    }

    async create(req, res,next) {
        req.body.content = "Attachement"
        if(!req.files){
            throw ApiError.badRequest('No attachement')
        }
        await messageController.create(req,res)
    }
}

module.exports = new attachementController