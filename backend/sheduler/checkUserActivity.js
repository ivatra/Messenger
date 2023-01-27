const userQueries = require('../database/postqre/queries/userQueries');
const dateService = require('../service/misc/dateService');

async function checkUserActivity() {
    const timeSwamp = dateService.countDate(2)
    
    const inActiveUsers = await userQueries.receiveInActiveUsers(timeSwamp)
    const promises = inActiveUsers.map(async (user) => {
        await userQueries.updateUserActivity(user.id,false)
    })
    await Promise.all(promises)
}

module.exports = checkUserActivity