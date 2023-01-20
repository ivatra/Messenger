const inBoxService = require('../../service/pages/inBoxService')

class inBoxController{
    async getAll(req, res,next) {
        const inbox = await inBoxService.getInbox(req.user.id)
        return res.json(inbox)
    }
}

module.exports = new inBoxController()