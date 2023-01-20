const cron = require('node-cron');

const checkUserActivity = require('./checkUserActivity');
const checkTypingStatus = require('./checkTypingStatus');

module.exports = function runSheduler() {
    cron.schedule('*/5 * * * *', async() => {
        await checkUserActivity();
        await checkTypingStatus()
    })
}