
const { User } = require("../models/userModel")

const { Sequelize } = require("../postgre")

class userQueries {

    async create(login, email, hashPassword, name, avatar) {
        return await User.create({ login, name, avatar: avatar, email, password: hashPassword })
    }

    async receiveUserById(userId) {
        return await User.findOne(
            {
                where: { id: userId },
                attributes: ['id', 'name', 'avatar', 'isActive', 'lastSeen', 'requestsCountPerMinute']
            })
    }

    async receiveUserByEmail(email) {
        return await User.findOne({ where: { email } })
    }

    async receiveUserByLogin(login) {
        return await User.findOne({ where: { login } })
    }

    async receiveInActiveUsers(date) {
        return await User.findAll({
            where: {
                lastSeen: { [Sequelize.Op.lt]: date }
            }
        });
    }

    async updateUserActivity(userId, isActive) {
        return await User.update({
            lastSeen: Sequelize.literal('CURRENT_TIMESTAMP'),
            isActive: isActive
        }, {
            where: {
                id: userId
            }
        })
    }

    async updateUser(userId, fields) {
        return await User.update(fields, {
            where: {
                id: userId
            }
        })
    }

    async incrementUserRequestCount(userId) {
        return await User.increment('requestsCountPerMinute', {
            where:
                { id: userId }
        })
    }

    async resetUsersRequestsCount() {
        return await User.update({ requestsCountPerMinute: 0 }, { where: {} });
    }

}


module.exports = new userQueries()