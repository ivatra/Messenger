const cron = require('node-cron');

const deactivateInactiveUsers = require('./deactivateInactiveUsers');
const deactivateTypingParticipants = require('./deactivateTypingParticipants');
const destroyNotActivatedAccounts = require('./destroyNotActivatedAccounts');

const activationQueries = require('../database/mongo/queries/activationQueries');
const userQueries = require('../database/postqre/queries/userQueries');

module.exports = async function runSheduler() {
    cron.schedule('* */1 * * * *', async() => { // every minute
        await deactivateInactiveUsers();
        await deactivateTypingParticipants()
        await userQueries.resetUsersRequestsCount()
    })

    cron.schedule('* */1 * * * *', async() => { // every hour
        await activationQueries.updateLinksToExpired()
    })

    cron.schedule('59 59 23 * * *', async() => { // every day
        await destroyNotActivatedAccounts()
        await activationQueries.destroyExpiredLinks()
    })
}