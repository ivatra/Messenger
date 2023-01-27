const jwt = require('jsonwebtoken')
const tokensQueries = require('../../database/mongo/queries/tokensQueries')

function generateAccess(userId) {
    return jwt.sign({
        userId,
        device
    },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: '7d' })

}

function generateRefresh(userId) {
    return jwt.sign({
        userId,
        device
    },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: '30d' })

}

class tokenService {
    generateTokens(userId, name, email) {
        const accessToken = generateAccess(userId, name, email)
        const refreshToken = generateRefresh(userId)

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