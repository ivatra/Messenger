const { Chat, IndividualChat, GroupChat, ChatParticipant } = require("../models/chatModel");
const { User } = require("../models/userModel");

const { Sequelize } = require("../postgre");

class chatQueries {
    async createChat(chatType) {
        return await Chat.create({ type: chatType })
    }

    async createChatModel(chatModel, chatId) {
        return await chatModel.create({ chatId: chatId })
    }

    async createParticipant(chatId, participantId) {
        return await ChatParticipant.findOrCreate({
            where: {
                chatId: chatId,
                userId: participantId
            }
        });
    }

    async receiveChatByPk(chatId) {
        return await Chat.findByPk(chatId)
    }

    async receiveInTypingParticipiants(date) {
        return await ChatParticipant.findAll({
            where: {
                isTyping: true,
                updatedAt: { [Sequelize.Op.lt]: date }
            }
        })
    }

    async receiveChatContent(chatId, userId) {
        return await Chat.findByPk(chatId, {
            attributes: ['id', 'type'],
            include: [{
                model: ChatParticipant,
                as: 'participants',
                include: [{
                    model: User,
                    attributes: ['id', 'name', 'avatar', 'isActive', 'lastSeen'],
                    where: {
                        id: {
                            [Sequelize.Op.ne]: userId
                        }
                    }
                }],
                attributes: ['role']
            },
            {
                model: GroupChat,
                attributes: ['avatar', 'name', 'participiantsCount']
            }, {
                model: IndividualChat,
                attributes: ['isActive']
            }],
        });
    }

    async receiveParticipantsByChat(chatId) {
        return await ChatParticipant.findAll({
            attributes: ['userId'],
            where: { chatId },
            include: {
                model: User,
                attributes: ['id', 'login', 'isActive']
            }
        });

    }

    async receiveChatByParticipants(firstUser, secondUser, chatType) {
        return await Chat.findAll({
            where: {
                '$participants.userId$': firstUser,
                '$participants.userId$': secondUser,
                type: chatType
            },
            attributes: ['id'],
            include: [
                {
                    model: ChatParticipant,
                    as: 'participants',
                    attributes: ['userId']
                }
            ],
        });
    }

    async receiveChatWhereUserIn(userId) {
        return await Chat.findAll({
            where: {
                '$participants.userId$': userId,
                type: "individual"
            },
            include: {
                model: ChatParticipant,
                as: 'participants'
            }
        })
    }


    async receiveParticipant(userId, chatId) {
        return await ChatParticipant.findOne({
            where: {
                userId: userId,
                chatId: chatId
            }

        })
    }

    async updateChatActiveStatus(chatId, status) {
        return await IndividualChat.update({ isActive: status }, {
            where: {
                id: chatId
            }
        })
    }
    async updateParticipantTypingStatus(userId, status) {
        return await ChatParticipant.update({ isTyping: status }, {
            where: {
                userId: userId
            }
        })
    }

    async updateGroupChatName(chatId, name) {
        return await GroupChat.update({ name: name }, {
            where: { chatId: chatId }
        })
    }

    async updateGroupChatAvatar(chatId,avatar) {
        return await GroupChat.update({avatar: avatar }, {
            where: { chatId: chatId }
        })
    }

    async destroyParticipant(chatId, participantId) {
        return await ChatParticipant.destroy({
            where: {
                chatId,
                userId: participantId
            }, individualHooks: true
        });
    }
}


module.exports = new chatQueries()