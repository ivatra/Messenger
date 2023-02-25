const stringService = require("../../../service/misc/stringService");
const { User, UserVector } = require("../models/userModel");
const chatQueries = require("../queries/chatQueries");
const userQueries = require("../queries/userQueries");

async function findIndividualChatsWhereUserIn(userId) {
    const chats = await chatQueries.receiveChatWhereUserIn(userId)
    var chatContent = []
    for (var chat of chats) {
        if (chat.dataValues.individual) {
            var content = await chatQueries.receiveChatContent(chat.dataValues.id, userId)
            chatContent.push(content)
        }
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


const createUserVector = async (user) => {
    const nameCopy =  stringService.removePunctuation(user.name).toLowerCase()
    const loginCopy = stringService.removePunctuation(user.login).toLowerCase()
    await userQueries.createUserVector(id, nameCopy, loginCopy)
}

const updateUserVector = async (user) => {
    const nameCopy = stringService.removePunctuation(user.name).toLowerCase()
    const loginCopy = stringService.removePunctuation(user.login).toLowerCase()
    await userQueries.updateUserVector(user.id, nameCopy, loginCopy)
}
const usersActivityUpdated = async () => {
    // var user = await User.findByPk('00227f96-f152-450f-a57d-eabc7bc7a43a')
    // var status = user.isActive ? false : true
    // user.update({ isActive: status })
    User.addHook('afterUpdate', async (user) => {
        if (user.changed('isActive')) {
            const individualChats = await findIndividualChatsWhereUserIn(user.id)
            for (let chat of individualChats) {
                let isActive = await checkIfAllUsersOnline(chat.participants)
                chatQueries.updateChatActiveStatus(chat.individualChat.id, isActive)
            }
        }
        else if (user.changed('name') || user.changed('login')) {
            await updateUserVector(user)
        }
    });

    User.addHook('afterCreate',async (user) => await createUserVector(user));
}

module.exports = usersActivityUpdated();