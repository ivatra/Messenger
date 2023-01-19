const { User } = require("../models/userModel");
const chatQueries = require("../queries/chatQueries");

async function findIndividualChatsWhereUserIn(userId) {
    const chats = await chatQueries.receiveChatWhereUserIn(userId)
    var chatContent = []
    for (var chat of chats) {
        const { id } = chat.dataValues
        var content = await chatQueries.receiveChatContent(id,userId)
        chatContent.push(content)
    }
    return chatContent
}

async function checkIfAllUsersOnline(participants) {
    let isActive = true;
    for (let participant of participants) {
        if (!participant.user.isActive) {
            isActive = false;
            break;
        }
    }
    return isActive
}

const usersActivityUpdated = async () => {
    // var user = await User.findByPk('cca23be1-897c-42a3-bfc3-178d96a73cba')
    // var status = user.isActive ? false : true
    // user.update({ isActive: status })
    User.addHook('afterUpdate', async (user) => {
        const isActiveChanged = user._changed.has('isActive');
        if (isActiveChanged) {
            const individualChats = await findIndividualChatsWhereUserIn(user.id)
            for (let chat of individualChats) {
                let isActive = await checkIfAllUsersOnline(chat.participants)
                chatQueries.updateChatActiveStatus(chat.individualChat.id,isActive)
            }
        }
    });
}

module.exports = usersActivityUpdated();