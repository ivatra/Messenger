const chatQueries = require('../database/postqre/queries/chatQueries');
const countDate = require('./dateCounter');

async function checkTypingStatus() {
    const inTypingUsers = await chatQueries.receiveInTypingParticipiants(countDate(1))
    const promises = inTypingUsers.map(async (participant) => {
        await chatQueries.updateParticipantTypingStatus(participant.userId,false)
    })
    await Promise.all(promises)
}

module.exports = checkTypingStatus