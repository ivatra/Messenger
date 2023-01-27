const mongoClient = require('../mongo');
const tokens = mongoClient.db('Messenger').collection('tokens');


class tokenQueries {
    async createRefreshToken(userId,device,token) {
        const refreshToken = {
            userId: userId,
            token: token,
            device: device,
            createdAt: Date.now()
        }

        await tokens.insertOne(refreshToken)

    }

    async updateRefreshToken(userId,device,token) {
        await tokens.updateOne({userId:userId,device:device},{
            $set: {
                "token": token
            }
        })

    }

    async receiveToken(userId,device) {
        return await tokens.findOne({
            userId: userId,
            device: device
        })

    }
}


module.exports = new tokenQueries()