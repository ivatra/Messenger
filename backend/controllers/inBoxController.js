const jwt = require('jsonwebtoken')

class inBoxController{
    async getAll(req, res,next) {
        return res.json(req.user)
    }
}

module.exports = new inBoxController()