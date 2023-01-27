const mongoClient = require('../mongo');
const activation = mongoClient.db('Messenger').collection('activationLinks');


class activationQueries {
    async createActivationLink(userId, link) {
        const activationRecord = {
            userId: userId,
            link: link,
            createdAt: Date.now(),
            expired: false
        }

        await activation.insertOne(activationRecord)
    }
}

module.exports = new activationQueries()