
const { ChatParticipant } = require("../models/chatModel");
const { User, UserVector } = require("../models/userModel")

const { Sequelize } = require("../postgre")

class userQueries {

    async create(login, email, hashPassword, name, avatar) {
        return await User.create({ login, name, avatar: avatar, email, password: hashPassword })
    }
    async createUserVector(userId,name,login){
        return await UserVector.create({ userId: userId, name, login });

    }
    async receiveUserById(userId) {
        return await User.findOne(
            {
                where: { id: userId },
                attributes: ['id', 'name', 'avatar', 'isActive', 'lastSeen'],
            })
    }
    async receiveUserServiceInfoById(userId) {
        return await User.findOne(
            {
                where: { id: userId },
                attributes: ['id', 'email', 'lastSeen', 'requestsCountPerMinute', 'isActivated']
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
    async receiveNotActivatedUsers() {
        return await User.findAll({
            where: {
                isActivated: false
            }
        });
    }
    async receiveUsersWhichSatisfyCriteria(likeMessage, plainMessage) {
        return await User.findAll({
            attributes: ['id', 'name', 'avatar', 'isActive', 'lastSeen'],
            include:
            {
                model: UserVector,
                attributes: [],
                where: {
                    [Sequelize.Op.or]: [
                        {
                            nameCopy: {
                                [Sequelize.Op.like]: likeMessage
                            }
                        },
                        {
                            loginCopy: {
                                [Sequelize.Op.like]: likeMessage
                            }
                        }
                    ]
                }
            },
            order: [
                [
                    Sequelize.literal(`ts_rank(to_tsvector("user"."name"), 
  plainto_tsquery('${plainMessage}'))`),
                    'DESC'
                ],
                [
                    Sequelize.literal(`ts_rank(to_tsvector("user"."login"), 
  plainto_tsquery('${plainMessage}'))`),
                    'DESC'
                ],
            ],
        })
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
        const user = await User.findByPk(userId)
        return await user.update(fields)
    }

    
    async updateUserVector(userId,name,login){
        await UserVector.update({ nameCopy: name, loginCopy: login }, {
            where: {
                userId: userId
            }
        })
    }
    
    async destroyUser(user){
        return await user.destroy({cascade:true,truncate:true})
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