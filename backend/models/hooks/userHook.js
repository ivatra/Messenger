const { IndividualChat, Chat, ChatParticipant } = require("../chatModel");
const { User } = require("../userModel");


async function findChatWhereUserIn(userId) {
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

async function getChatContent(id) {
    return await Chat.findOne({
        where: {
            id: id
        }, include: [
            {
                model: ChatParticipant,
                as: 'participants',
                attributes: ['userId'],
                include: [{
                    model: User,
                    attributes: ['id', 'isActive']
                }]
            }
            , {
                model: IndividualChat,
                attributes: ['id']
            }
        ], attributes: ['id']
    })
}

async function findIndividualChatsWhereUserIn(userId) {
    const chats = await findChatWhereUserIn(userId)
    var chatContent = []
    for (var chat of chats) {
        const { id } = chat.dataValues
        var content = await getChatContent(id)
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
    // var user = await User.findByPk('03cb010a-2237-476d-931c-462e44695c03')
    // var status = user.isActive ? false : true
    // user.update({ isActive: status })
    User.addHook('afterUpdate', async (user) => {
        const isActiveChanged = user._changed.has('isActive');
        if (isActiveChanged) {
            const individualChats = await findIndividualChatsWhereUserIn(user.id)
            for (let chat of individualChats) {
                let isActive = await checkIfAllUsersOnline(chat.participants)
                const individualChat = await IndividualChat.findByPk(chat.individualChat.id);
                individualChat.isActive = isActive;
                await individualChat.save();
            }
        }
    });
}

module.exports = usersActivityUpdated();