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

function fetchProps(inboxes) {
    var arr = []
    for (var inbox of inboxes) {
        var obj = { id: inbox.id, chatId: inbox.chat.id, countUnreadMsgs: inbox.countUnreadMsgs, isPinned: inbox.isPinned, message: inbox.message.dataValues }

        if (inbox.chat.groupChat) {
            obj = { ...obj, name: inbox.chat.groupChat.name, avatar: inbox.chat.groupChat.avatar, chatType: 'group' }
        } else {
            obj = { ...obj, name: inbox.chat.participants[0].user.name, avatar: inbox.chat.participants[0].user.avatar, chatType: "individual" }
        }
        arr.push(obj)
    }
    return arr

}

function sortContactsByIsContact(contacts) {
    return contacts.sort((a, b) => {
        if (a.isContact && !b.isContact) {
            return -1;
        } else if (!a.isContact && b.isContact) {
            return 1;
        } else {
            return contacts.indexOf(a) - contacts.indexOf(b)
        }
    });
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
    const users = await User.findAll()
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

        const likeString = stringService.convertToLikeStructure(searchTerm)

        const {users,count} = await searchUsers(senderId,searchTerm,limit,offset)

        let newUsers = []

        for (var user of users) {
            const contact = await contactsQueries.receiveContact(senderId, user.dataValues.id)
            user.dataValues.isContact = contact !== null
            if (contact !== null) {
                if (contact.dataValues.senderId === senderId && contact.dataValues.status === 'pending') {
                    var merged = { ...user.dataValues, status: 'outgoing' }
                } else {
                    var merged = { ...user.dataValues, status: contact.dataValues.status }
                }
                newUsers.push(merged)
            } else newUsers.push({ ...user.dataValues, status: null })
        }

        return { data: newUsers, count }

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