const userQueries = require("../database/postqre/queries/userQueries")
const bcrypt = require('bcrypt')
const ApiError = require("../error/ApiError")
const fileService = require("./misc/fileService")


class userService {
    async updateUserInfo(userId, name, login, password, avatar) {
        var message = ''
        if (!name && !login && !password && !avatar) {
            throw ApiError.badRequest('There is nothing to change in profile');
        }

        if (login) {
            await this.validateUniqueLogin(userId, login);
            message += 'login [' + login + '], '
        }

        if (avatar) {
            avatar = await this.validateAndSaveAvatar(avatar);
            message += 'avatar [' + avatar + '], '
        }

        if (password) {
            password = await bcrypt.hash(password, 5);
            message += 'password [ **** ], '
        }

        if (name) {
            message += 'name [' + name + '],'
        }

        const updatedFields = { name, login, password, avatar };
        await userQueries.updateUser(userId, updatedFields);

        return message
    }

    async validateUniqueLogin(userId, login) {
        const user = await userQueries.receiveUserByLogin(login);
        if (user && user.id !== userId) {
            throw ApiError.badRequest('User with this login already exists');
        }
    }

    async validateAndSaveAvatar(avatar) {
        await fileService.checkForImage(avatar.name);
        return await fileService.saveFile(avatar, avatar.name, 'userAvatars')
    }
}

module.exports = new userService()