const { Sequelize } = require('../db');
const { User } = require('../models/userModel')

async function findInActiveUsers() {
    return await User.findAll({
        where: {
            lastSeen: { [Sequelize.Op.lt]: new Date(Date.now() - minutesToTimeSwamp(5)) }
        }
    });
}

function minutesToTimeSwamp(minutes) {
    return 1000 * 60 * minutes
}

async function checkUserActivity() {
    const inActiveUsers = await findInActiveUsers();
    const promises = inActiveUsers.map(async (user) => {
        await User.update({ isActive: false }, {
            where: {
                id: user.id
            }
        })
    })
    await Promise.all(promises)
}

module.exports = checkUserActivity