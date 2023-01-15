const { Sequelize } = require('../db');
const { ChatParticipant } = require('../models');

async function findInTypingUsers() {
    return await ChatParticipant.findAll({where:{
        isTyping:true,
        updatedAt: { [Sequelize.Op.lt]: new Date(Date.now() - minutesToTimeSwamp(1)) }
    }})
}

function minutesToTimeSwamp(minutes) {
    return 1000 * 60 * minutes
}

async function checkTypingStatus() {
    const inTypingUsers = await findInTypingUsers();
    const promises = inTypingUsers.map(async (participant) => {
        await ChatParticipant.update({ isTyping: false }, {
            where: {
                id: participant.id
            }
        })
    })
    await Promise.all(promises)
}

module.exports = checkTypingStatus