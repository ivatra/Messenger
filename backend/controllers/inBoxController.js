const jwt = require('jsonwebtoken')
const pagesService = require('../service/pagesService')

class inBoxController{
    async getAll(req, res,next) {
        const inbox = await pagesService.getInbox(req.user.id)
        return res.json(inbox)
    }
}

module.exports = new inBoxController()