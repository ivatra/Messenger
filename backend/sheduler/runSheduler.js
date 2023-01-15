const cron = require('node-cron');

const checkUserActivity = require('./checkUserActivity')

module.exports = function runSheduler() {
    cron.schedule('1,2,4,5 * * * *', () => {
        checkUserActivity();
    })
}