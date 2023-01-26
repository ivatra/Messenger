const cron = require('node-cron');

const checkUserActivity = require('./checkUserActivity');
const checkTypingStatus = require('./checkTypingStatus');
const resetRequestCount = require('./resetRequestCount');

module.exports = async function runSheduler() {
    cron.schedule('*/1 * * * *', async() => {
        await checkUserActivity();
        await checkTypingStatus()
        await resetRequestCount()
    })
}