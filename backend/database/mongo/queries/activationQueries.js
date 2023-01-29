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

    async receiveLink(link) {
        return await activation.findOne({ link: link })
    }

    async destroyExpiredLinks() {
        return await activation.destroy({ expired: true })
    }

    async updateLinksToExpired() {
        return await activation.updateAll({
            createdAt: { $lt: oneHourAgo }
        }, {
            $set: { isExpired: true }
        })
    }

    async expireLink(userId) {
        return await activation.updateOne({ userId: userId }, { $set: { expired: true } })
    }
}

module.exports = new activationQueries()