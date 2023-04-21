const { InBox } = require("../database/postqre/models/inBoxModel");
const { Message } = require("../database/postqre/models/messageModel");
const { Sequelize } = require("../database/postqre/postgre");
const chatQueries = require("../database/postqre/queries/chatQueries");
const contactsQueries = require("../database/postqre/queries/contactsQueries");
const inboxQueries = require("../database/postqre/queries/inboxQueries");
const messageQueries = require("../database/postqre/queries/messageQueries");
const userQueries = require("../database/postqre/queries/userQueries");
const ApiError = require("../error/ApiError");
const stringService = require("./misc/stringService");
const contactsService = require("./pages/contactsService");

function getInboxesId(inboxes) {
    return inboxes.
        map(inbox => inbox.id);
}

async function receiveMessageContentByIds(messageIds) {
    return await Promise.all(messageIds.map(async (message) =>
        await messageQueries.receiveMessage(message.id)
    ))
}

function makeContactsUnique(contacts) {
    let unique = {}
    contacts.filter(item => {
        let id = item.id;
        if (unique[id]) {
            return item.isClient || unique[id].isClient;
        }
        unique[id] = item;
        return true;
    });
    return unique
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


class searchService {
    async searchInContacts(senderId, contact, limit, offset) {
        if (!contact) return
        const likeString = stringService.convertToLikeStructure(contact)

        const { users, count } = await userQueries.receiveUsersWhichSatisfyCriteria(likeString, contact, limit, offset)

        let newUsers = []

        for (var user of users) {
            const contact = await contactsQueries.receiveContact(senderId, user.dataValues.id)
            user.dataValues.isContact = contact !== null
            user.dataValues.status = contact !== null ? contact.dataValues.status : null
            newUsers.push(user)
        }

        return { data: users, count }

    }
    async searchInInbox(senderId, message) {
        const chatsWhereUserIn = await chatQueries.receiveChatsWhereUserIn(senderId)
        const chatIdsWhereUserIn = chatsWhereUserIn.map(chat => chat.id);

        const likeString = stringService.convertToLikeStructure(message)

        const messages = await messageQueries.receiveMessagesIdsThatSatisfyMessage(chatIdsWhereUserIn, likeString, message)
        const messagesContented = await receiveMessageContentByIds(messages)

        const messagedInboxesId = await findInboxIdsByMessageIds(messagesContented, senderId)

        // const inboxes = await inboxQueries.receiveInboxesWhichSatisfyMessage(chatIdsWhereUserIn, message, likeString)
        // const inboxesId = getInboxesId(inboxes)

        const augmentedInboxes = await inboxQueries.receiveInboxesByIds(messagedInboxesId, senderId);

        for (let i = 0; i < augmentedInboxes.length; i++) {
            const msg = messagesContented.filter((msg) => msg.dataValues.chatId === augmentedInboxes[i].dataValues.chat.id)
            if (msg) {
                augmentedInboxes[i].dataValues.message = msg[0]
            }
        }

        return augmentedInboxes
    }

    async searchInChat(chatId, message) {
        const wrappedChatId = [chatId]

        const likeString = stringService.convertToLikeStructure(message)

        const messagesId = await messageQueries.receiveMessagesIdsThatSatisfyMessage(wrappedChatId, likeString, message)

        return await receiveMessageContentByIds(messagesId)

    }

}


module.exports = new searchService()