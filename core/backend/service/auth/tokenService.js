const jwt = require('jsonwebtoken')
const tokensQueries = require('../../database/mongo/queries/tokensQueries')

function generateAccess(id,device) {
    return jwt.sign({
        id,
        device
    },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_LIFECYCLE + 'd' })

}

function generateRefresh(id,device) {
    return jwt.sign({
        id,
        device
    },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_LIFECYCLE + 'd' })

}

class tokenService {
    generateAccess(id,device) {
        return jwt.sign({
            id,
            device
        },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_LIFECYCLE + 'd' })
    
    }

    generateRefresh(id,device) {
        return jwt.sign({
            id,
            device
        },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_LIFECYCLE + 'd' })
    
    }

    generateTokens(userId,device) {
        const accessToken = this.generateAccess(userId,device)
        const refreshToken = this.generateRefresh(userId,device)

        return { accessToken, refreshToken }
    }

    async saveRefreshToken(userId, device, generatedToken) {
        const token = await tokensQueries.receiveToken(userId, device)
        if (token)
            await tokensQueries.updateRefreshToken(userId, device, generatedToken)
        else 
            await tokensQueries.createRefreshToken(userId, device, generatedToken)
    }

    verifyJwtToken(token){
        if (!token)
            return res.status(401).json({message:"The user is not logged in"})
            
        return jwt.verify(token,process.env.JWT_ACCESS_SECRET)

    }
}

module.exports = new tokenService()