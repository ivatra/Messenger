const { User } = require('../models/userModel')
const mongoClient = require("../mongo");
const requests = mongoClient.db('Messenger').collection('usersRequests');

async function findActiveUsers() {
    return await User.findAll({
        where: { isActive: false },
        attributes: ['id']
    })
}

function minutesToTimeSwamp(minutes){
    return 1000 * 60 * minutes
}
async function checkUserActivity() {
    const activeUsers = await findActiveUsers();
    const ids = activeUsers.map(user => user._id);
    
    const inActiveUsers = await requests.find({
        _id: { $in: ids },
        lastRequestTime: { $lt: Date.now() - minutesToTimeSwamp(5) }
    }).toArray();

    inActiveUsers.forEach(async (user) => {
        await requests.updateOne({ _id: user._id }, { $set: { isActive: false } });
    });
}

module.exports = checkUserActivity