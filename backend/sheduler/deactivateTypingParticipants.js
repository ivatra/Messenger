const chatQueries = require('../database/postqre/queries/chatQueries');
const dateService = require('../service/misc/dateService');


async function deactivateTypingParticipants() {
    const timeSwamp = dateService.countDate(1)

    const inTypingUsers = await chatQueries.receiveInTypingParticipiants(timeSwamp)
    const promises = inTypingUsers.map(async (participant) => {
        await chatQueries.updateParticipantTypingStatus(participant.userId, false)
    })

    await Promise.all(promises)
}

module.exports = deactivateTypingParticipants