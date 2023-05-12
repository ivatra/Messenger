const cron = require('node-cron');

const deactivateInactiveUsers = require('./deactivateInactiveUsers');
const deactivateTypingParticipants = require('./deactivateTypingParticipants');
const destroyNotActivatedAccounts = require('./destroyNotActivatedAccounts');

const activationQueries = require('../database/mongo/queries/activationQueries');
const userQueries = require('../database/postqre/queries/userQueries');
const tokensQueries = require('../database/mongo/queries/tokensQueries');
const captchaQueries = require('../database/mongo/queries/captchaQueries');

module.exports = async function runSheduler() {
    cron.schedule('*/3 * * * * *', async () => { // every 5 seconds
        await eventsQueries.destroyNotRelevant()
    })
    cron.schedule('*/1 * * * *', async () => { // every minute
        await deactivateInactiveUsers();
        await deactivateTypingParticipants()
        await userQueries.resetUsersRequestsCount()
        await eventsQueries.destroyNotRelevant()
    })

    cron.schedule('* */1 * * * *', async () => { // every hour
        await activationQueries.updateLinksToExpired()
    })

    cron.schedule('59 59 23 * * *', async () => { // every day
        // await destroyNotActivatedAccounts()
        await activationQueries.destroyExpiredLinks()
        await captchaQueries.destroyCaptcha()
    })

    cron.schedule('* * * 1 * *', async () => { // every month
        await tokensQueries.destroyExpiredTokens()
    })
    
}