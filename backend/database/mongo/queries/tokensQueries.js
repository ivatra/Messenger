const mongoClient = require('../mongo');
const tokens = mongoClient.db('Messenger').collection('tokens');


class tokenQueries {
    async createRefreshToken(userId, device, token) {
        const refreshToken = {
            userId: userId,
            token: token,
            device: device,
            createdAt: Date.now(),
            expired: false
        }

        await tokens.insertOne(refreshToken)

    }

    async receiveToken(userId, device) {
        return await tokens.findOne({
            userId: userId,
            device: device
        })

    }

    async receiveValidToken(token) {
        return await tokens.findOne({
            token: token,
            expired: false
        })

    }

    async updateRefreshToken(userId, device, token) {
        return await tokens.updateOne({ userId: userId, device: device }, {
            $set: {
                "token": token,
                "expired": false
            }
        })

    }

    async expireRefreshToken(token) {
        return await tokens.updateOne({ token: token }, {
            $set: {
                "expired": true
            }
        })

    }

    async expireRefreshTokensByUser(userId) {
        return await tokens.updateMany({ userId: userId }, {
            $set: {
                "expired": true
            }
        })

    }

    async destroyExpiredTokens() {
        return await tokens.deleteMany({ expired: true })
    }
}


module.exports = new tokenQueries()