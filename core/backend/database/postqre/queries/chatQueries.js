const { Sequelize } = require("sequelize");
const { Chat, IndividualChat, GroupChat, ChatParticipant } = require("../models/chatModel");
const { User } = require("../models/userModel");

class chatQueries {
    async createChat(chatType) {
        return await Chat.create({ type: chatType })
    }

    async createIndividuaChat(chatId) {
        return await IndividualChat.create({ chatId: chatId })
    }

    async createGroupChat(chatId, avatar = 'bdb4cfb7-1d28-4aa3-93f5-36c3402c54c8.jpg', name) {
        return await GroupChat.create({ chatId: chatId, avatar: avatar, name: name })
    }

    async createParticipant(chatId, participantId, role) {
        return await ChatParticipant.findOrCreate({
            where: {
                chatId: chatId,
                userId: participantId,
                role: role
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
                    attributes: ['id', 'name', 'login', 'avatar', 'isActive', 'lastSeen'],
                    required: true
                }],
                attributes: ['id', 'role', 'isTyping']
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
            attributes: ['userId', 'role'],
            where: { chatId },
            include: {
                model: User,
                attributes: ['id', 'login', 'isActive']
            }
        });

    }

    async receiveChatByParticipants(firstUser, secondUser, chatType) {
        return await Chat.findAll({
            include: [
                {
                    model: ChatParticipant,
                    as: 'participants',
                    attributes: ['userId', 'chatId'],
                    where: {
                        userId: [firstUser, secondUser]
                    }
                }
            ],
            where: {
                type: chatType
            },
        })
    }

    async receiveChatsWhereUserIn(userId) {
        return await Chat.findAll({
            where: {
                '$participants.userId$': userId,
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

    async updateGroupChatAvatar(chatId, avatar) {
        return await GroupChat.update({ avatar: avatar }, {
            where: { chatId: chatId }
        })
    }

    async destroyParticipant(participantId) {
        return await ChatParticipant.destroy({
            where: {
                id:participantId
            },
            individualHooks: true
        });
    }
}


module.exports = new chatQueries()