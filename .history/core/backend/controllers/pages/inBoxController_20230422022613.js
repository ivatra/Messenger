const inBoxService = require('../../service/pages/inBoxService')

class inBoxController {
    async getAll(req, res, next) {
        const inbox = await inBoxService.getInbox(req.user.id)
        return res.json(inbox)
    }

    async pinInbox(req, res) {
        const { inboxId } = req.params
        const updatedInbox = await inBoxService.pinInbox(inboxId)
        return res.json(updatedInbox)
    }
}

module.exports = new inBoxController()