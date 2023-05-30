const tokensQueries = require("../database/mongo/queries/tokensQueries");
const userService = require("../service/userService")


class userController {
    async update(req, res, next) {
        const { name, login, password } = req.body
        const userAgent = req.headers['user-agent']
        var avatar

        if (req.files)
            avatar = req.files.avatar

        const profile = await userService.updateUserInfo(req.user.id, name, login, password, avatar, userAgent)
        return res.json(profile)

    }

    async getUser(req, res, next) {
        const { id } = req.params

        const user = await userService.getUserById(id)

        return res.json(user)
    }
}

module.exports = new userController()