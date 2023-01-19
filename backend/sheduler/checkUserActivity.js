const userQueries = require('../database/postqre/queries/userQueries');
const countDate = require('./dateCounter');

async function setUserActivityFalse(userId) {
    await userQueries.update(userId, { isActive: false })
}

async function checkUserActivity() {
    const inActiveUsers = await userQueries.receiveInActiveUsers(countDate(5))
    const promises = inActiveUsers.map(async (user) => {
        await setUserActivityFalse(user.id)
    })
    await Promise.all(promises)
}

module.exports = checkUserActivity