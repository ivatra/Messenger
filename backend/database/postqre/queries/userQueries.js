
const { User } = require("../models/userModel")

const { Sequelize } = require("../postgre")

class userQueries {
    async receiveUserByEmail(email) {
        return await User.findOne({ where: { email } })
    }

    async create(login, email, hashPassword, name, avatar) {
        console.log(avatar)
        return await User.create({ login, name, avatar: avatar, email, password: hashPassword })
    }

    async receiveUserById(userId) {
        return await User.findOne(
            {
                where: { id: userId },
                attributes: ['id', 'name', 'avatar', 'isActive', 'lastSeen']
            })
    }

    async receiveInActiveUsers(date) {
        return await User.findAll({
            where: {
                lastSeen: { [Sequelize.Op.lt]: date }
            }
        });
    }

    updateUserActivity(userId) {
        return User.update({
            lastSeen: Sequelize.literal('CURRENT_TIMESTAMP'),
            isActive: true
        }, {
            where: {
                id: userId
            }
        })
    }
}


module.exports = new userQueries()