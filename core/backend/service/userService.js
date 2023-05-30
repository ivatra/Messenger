const userQueries = require("../database/postqre/queries/userQueries")
const bcrypt = require('bcrypt')
const ApiError = require("../error/ApiError")
const fileService = require("./misc/fileService")
const tokensQueries = require("../database/mongo/queries/tokensQueries")


class userService {
    async updateUserInfo(userId, name, login, password, avatar) {
        if (!name && !login && !password && !avatar) {
            throw ApiError.badRequest('There is nothing to change in profile');
        }

        if (login) {
            await this.validateUniqueLogin(userId, login);
        }

        if (avatar) {
            avatar = await this.validateAndSaveAvatar(avatar);
        }

        if (password) {
            password = await bcrypt.hash(password, 5);

            await tokensQueries.expireRefreshTokensByUser(userId)
        }

        const updatedFields = { name, login, password, avatar };
        const result = await userQueries.updateUser(userId, updatedFields);


        return result.dataValues
    }

    async getUserById(userId) {
        if(!userId){
            throw ApiError.badRequest('No userId has passed')
        }
        return await userQueries.receiveUserById(userId)
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

