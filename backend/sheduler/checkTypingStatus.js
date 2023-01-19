const chatQueries = require('../database/postqre/queries/chatQueries');
const countDate = require('./dateCounter');

async function checkTypingStatus() {
    const inTypingUsers = await chatQueries.receiveInTypingParticipiants(countDate(5))
    const promises = inTypingUsers.map(async (participant) => {
        chatQueries.updateParticipantTypingStatus(participant.id,false)
    })
    await Promise.all(promises)
}

module.exports = checkTypingStatus