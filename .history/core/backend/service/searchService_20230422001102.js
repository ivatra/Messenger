const chatQueries = require("../database/postqre/queries/chatQueries");
const contactsQueries = require("../database/postqre/queries/contactsQueries");
const inboxQueries = require("../database/postqre/queries/inboxQueries");
const messageQueries = require("../database/postqre/queries/messageQueries");
const userQueries = require("../database/postqre/queries/userQueries");
const stringService = require("./misc/stringService");
const contactsService = require("./pages/contactsService");


function getInboxesId(inboxes) {
    return inboxes.
        filter(inbox => inbox.user != null).
        map(inbox => inbox.id);
}

async function receiveMessageContentByIds(messageIds) {
    return await Promise.all(messageIds.map(async (message) =>
        await messageQueries.receiveMessage(message.id)
    ))
}

function makeContactsUnique(contacts){
    let unique = {}
    contacts.filter(item => {
        let id = item.data.id;
        if (unique[id]) {
            return item.isClient || unique[id].isClient;
        }
        unique[id] = item;
        return true;
    });
    return unique
}

function sortContactsByIsContact(contacts){
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
class searchService {
    async searchInContacts(senderId, contact) {
        const likeString = stringService.convertToLikeStructure(contact)

        const userContactsIds = await contactsQueries.receiveContactsByUser(senderId, 'accepted')

        const contactsUsers = await contactsService.fetchContactsInfo(userContactsIds, senderId)
        const allMatchedUsers = await userQueries.receiveUsersWhichSatisfyCriteria(likeString, contact)

        const filteredUserContacts = contactsUsers.filter((contact) => {
            return allMatchedUsers.find((user) => user.id === contact.id);
        })

        const merged = [
            ...filteredUserContacts.map((contact) => ({ isContact: true, data: contact })),
            ...allMatchedUsers.map((user) => ({ isContact: false, data: user })),
        ]
        
        const uniqueContacts = makeContactsUnique(merged)
        
        const structuredContacts = Object.values(uniqueContacts)
        
        return sortContactsByIsContact(structuredContacts)

    }
    async searchInInbox(senderId, message) {
        const chatsWhereUserIn = await chatQueries.receiveChatsWhereUserIn(senderId)
        const chatIds = chatsWhereUserIn.map(chat => chat.id);

        const likeString = stringService.convertToLikeStructure(message)

        const messagesId = await messageQueries.receiveMessagesIdsThatSatisfyMessage(chatIds, likeString, message)
        const messages = await receiveMessageContentByIds(messagesId)

        const inboxes = await inboxQueries.receiveInboxesWhichSatisfyMessage(chatIds, message, likeString)
        const inboxesId = getInboxesId(inboxes)

        const augmentedInboxes = await inboxQueries.receiveUserInboxesByInboxesList(senderId, inboxesId)

        return [
            ...messages.map((message) => ({ type: 'message', data: message })),
            ...augmentedInboxes.map((inbox) => ({ type: 'inbox', data: inbox })),
        ];
    }

    async searchInChat(chatId, message) {
        const wrappedChatId = [chatId]

        const likeString = stringService.convertToLikeStructure(message)

        const messagesId = await messageQueries.receiveMessagesIdsThatSatisfyMessage(wrappedChatId, likeString, message)

        return await receiveMessageContentByIds(messagesId)

    }

}


module.exports = new searchService()