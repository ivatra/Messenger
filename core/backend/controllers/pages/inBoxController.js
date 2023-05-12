const { badRequest } = require('../../error/ApiError')
const inBoxService = require('../../service/pages/inBoxService')

class inBoxController {
    async getAll(req, res, next) {
        const { limit, offset } = req
        const inbox = await inBoxService.getInbox(req.user.id, limit, offset)
        return res.json(inbox)
    }

    async getPinned(req, res, next) {
        const pinnedInboxes = await inBoxService.getPinnedInboxes(req.user.id)
        return res.json(pinnedInboxes)
    }

    async pinInbox(req, res) {
        const { inboxId } = req.params
        const updatedInbox = await inBoxService.pinInbox(inboxId)
        return res.json(updatedInbox)
    }

    async getByChat(req, res) {
        const { chatId } = req.query
        if(!chatId) throw badRequest('No chatId')
        const inbox = await inBoxService.getByChat(req.user.id, chatId)
        return res.json(inbox)


    }
}

module.exports = new inBoxController()