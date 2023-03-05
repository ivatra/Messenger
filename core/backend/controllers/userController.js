const tokensQueries = require("../database/mongo/queries/tokensQueries");
const userService = require("../service/userService")


class userController {
    async update(req, res, next) {
        const { name, login, password } = req.body
        const userAgent = req.headers['user-agent']
        var avatar

        if (req.files)
            avatar = req.files.avatar

        const elements = await userService.updateUserInfo(req.user.id, name, login, password, avatar,userAgent)
        return res.json(`${elements} succecsfully changed.`)

    }
}

module.exports = new userController()