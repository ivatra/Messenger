const { InBox } = require("../database/postqre/models/inBoxModel");
const { Message } = require("../database/postqre/models/messageModel");
const { User } = require("../database/postqre/models/userModel");
const { Sequelize } = require("../database/postqre/postgre");
const chatQueries = require("../database/postqre/queries/chatQueries");
const contactsQueries = require("../database/postqre/queries/contactsQueries");
const inboxQueries = require("../database/postqre/queries/inboxQueries");
const messageQueries = require("../database/postqre/queries/messageQueries");
const userQueries = require("../database/postqre/queries/userQueries");
const ApiError = require("../error/ApiError");
const stringService = require("./misc/stringService");
const contactsService = require("./pages/contactsService");
const { proceedInboxes } = require("./pages/inBoxService");

async function receiveMessageContentByIds(messageIds) {
    return await Promise.all(messageIds.map(async (message) =>
        await messageQueries.receiveMessage(message.id)
    ))
}

async function findInboxIdsByMessageIds(messages, userId) {
    const messageIds = messages.map((message) => message.id);
    const inboxes = await InBox.findAll({
        where: {
            userId,
            chatId: {
                [Sequelize.Op.in]: messages.map((message) => message.chatId),
            },
        },
    });

    const inboxMap = new Map(inboxes.map((inbox) => [inbox.chatId, inbox.id]));

    return messageIds.map((messageId) => inboxMap.get(messages.find((message) => message.id === messageId).chatId));
}

async function searchUsers(senderId,searchTerm,limit,offset) {
    const users = await User.findAll({offset:offset,limit:limit})
    const searchResults = users.filter(user => {
        const userName = user.dataValues.name.toLowerCase();
        const search = searchTerm.toLowerCase();
        return userName.includes(search) && user.dataValues.id !== senderId;
    });

    const count = searchResults.length;
    return { users: searchResults, count };
}

class searchService {
    async searchInContacts(senderId, searchTerm, limit, offset) {
        if (!searchTerm) return

        const {users,count} = await searchUsers(senderId,searchTerm,limit,offset)

        const fetchedUsers = users.map((user)=>{
            return {
                [user.id]:{
                    id: user.id,
                    name: user.name,
                    login: user.login,
                    avatarUrl: user.avatar,
                    isActive: user.isActive,
                    lastSeen: user.lastSeen,
                }
            }
        })
        return { data: fetchedUsers, count }

    }
    async searchInInbox(senderId, message) {
        const chatsWhereUserIn = await chatQueries.receiveChatsWhereUserIn(senderId)
        const chatIdsWhereUserIn = chatsWhereUserIn.map(chat => chat.id);

        const likeString = stringService.convertToLikeStructure(message)

        const messagesIds = await messageQueries.receiveMessagesIdsThatSatisfyMessage(senderId,chatIdsWhereUserIn, likeString, message)
        const fullMessages = await receiveMessageContentByIds(messagesIds)

        const inboxesIdsWithMessage = await findInboxIdsByMessageIds(fullMessages, senderId)

        const augmentedInboxes = await inboxQueries.receiveInboxesByIds(inboxesIdsWithMessage, senderId);

        for (let i = 0; i < augmentedInboxes.length; i++) {
            const msg = fullMessages.filter((msg) => msg.chatId === augmentedInboxes[i].chat.id)
            if (msg) {
                augmentedInboxes[i].message = msg[0]
            }
        }
        return proceedInboxes(augmentedInboxes)
    }

    async searchInChat(chatId, message) {
        const wrappedChatId = [chatId]

        const likeString = stringService.convertToLikeStructure(message)

        const messagesId = await messageQueries.receiveMessagesIdsThatSatisfyMessage(wrappedChatId, likeString, message)

        return await receiveMessageContentByIds(messagesId)

    }

}


module.exports = new searchService()