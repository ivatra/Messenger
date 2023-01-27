const tokensQueries = require("../database/mongo/queries/tokensQueries");
const userService = require("../service/userService")

const useragent = require('useragent');

class userController {
    async update(req, res, next) {
        const { name, login, password } = req.body
        var avatar

        if (req.files)
            avatar = req.files.avatar
        const elements = await userService.updateUserInfo(req.user.id, name, login, password, avatar)
        return res.json(`${elements} succecsfully changed.`)

    }
}

module.exports = new userController()