const cron = require('node-cron');

const checkUserActivity = require('./checkUserActivity')

module.exports = function runSheduler() {
    cron.schedule('*/5 * * * *', () => {
        // checkUserActivity();
    })
}