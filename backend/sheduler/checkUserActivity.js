const userQueries = require('../database/postqre/queries/userQueries');
const countDate = require('./dateCounter');

async function checkUserActivity() {
    const inActiveUsers = await userQueries.receiveInActiveUsers(countDate(5))
    const promises = inActiveUsers.map(async (user) => {
        await userQueries.updateUserActivity(user.id,false)
    })
    await Promise.all(promises)
}

module.exports = checkUserActivity