const ApiError = require("../../error/ApiError")
const attachementService = require("../../service/chat/attachementService")
const messageService = require("../../service/chat/messageService")
const messageController = require("./messageController")

class attachementController {
    async getAll(req, res) {
        const {chatId} = req.query
        const messages = await attachementService.fetchAll(chatId,req.limit, req.offset)
        return res.json(messages)
    }

    async getOne(req, res) {
        const {attachId} = req.params
        const messages = await attachementService.fetchOne(attachId)
        return res.json(messages)
    }

    async create(req, res,next) {
        const { attachement } = req.files || false

        if(!attachement){
            throw ApiError.badRequest('No attachement has passed')
        }

        const {chatId} = req.body

        if(!chatId){
            throw ApiError.badRequest('No chatId has passed')
        }
        
        const message = await messageService.createMessage('Attachement', attachement, req.user.id, chatId)

        return res.json(message.attachement)
    }
}

module.exports = new attachementController