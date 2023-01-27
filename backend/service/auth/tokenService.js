const jwt = require('jsonwebtoken')
const tokensQueries = require('../../database/mongo/queries/tokensQueries')

function generateAccess(userId,device) {
    return jwt.sign({
        userId,
        device
    },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '7d' })

}

function generateRefresh(userId,device) {
    return jwt.sign({
        userId,
        device
    },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '30d' })

}

class tokenService {
    generateTokens(userId,device) {
        const accessToken = generateAccess(userId,device)
        const refreshToken = generateRefresh(userId,device)

        return { accessToken, refreshToken }
    }

    async saveRefreshToken(userId, device, generatedToken) {
        const token = await tokensQueries.receiveToken(userId, device)
        if (token)
            await tokensQueries.updateRefreshToken(userId, device, generatedToken)
        else 
            await tokensQueries.createRefreshToken(userId, device, generatedToken)
    }
}

module.exports = new tokenService()