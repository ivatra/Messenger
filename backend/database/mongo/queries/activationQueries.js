const mongoClient = require('../mongo');
const activation = mongoClient.db('Messenger').collection('activationLinks');


class activationQueries {
    async createLink(userId, link) {
        const activationRecord = {
            userId: userId,
            link: link,
            createdAt: Date.now(),
            expired: false
        }

        await activation.insertOne(activationRecord)
    }

    async receiveLink(userId,link){
        return await activation.findOne({userId:userId,link:link})
    }
}

module.exports = new activationQueries()