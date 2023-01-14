const mongoClient = require("../mongo");
const requests = mongoClient.db('Messenger').collection('usersRequests');
const { User } = require('../models/userModel')


async function findActiveUsers() {
    return await User.findAll({
        where: { isActive: false },
        attributes: ['id']
    })
}
async function checkUserActivity() {
    const activeUsers = await findActiveUsers();
    const ids = activeUsers.map(user => user._id);
    
    const inActiveUsers = await requests.find({
        _id: { $in: ids },
        lastRequestTime: { $lt: Date.now() - 300000 }
    }).toArray();

    inActiveUsers.forEach(async (user) => {
        await requests.updateOne({ _id: user._id }, { $set: { isActive: false } });
    });
}

module.exports = checkUserActivity