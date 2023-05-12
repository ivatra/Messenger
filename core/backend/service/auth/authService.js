const ApiError = require('../../error/ApiError')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const useragent = require('useragent');

const userQueries = require("../../database/postqre/queries/userQueries")
const mailService = require('./mailService')
const tokenService = require('./tokenService');
const activationQueries = require('../../database/mongo/queries/activationQueries');
const tokensQueries = require('../../database/mongo/queries/tokensQueries');


function comparePassword(correctPassword, requestPassword) {
    const isPasswordCorrect = bcrypt.compareSync(requestPassword, correctPassword)
    if (!isPasswordCorrect)
        throw ApiError.Internal('Incorrent password')
}

function parseDevice(userAgent) {
    const agent = useragent.parse(userAgent);
    const browser = agent.device.family + ' ' + agent.device.major
    const os = agent.os.family + ' ' + agent.os.major
    return { browser: browser, os: os }
}

async function authenticateUser(userId, userAgent) {
    const device = parseDevice(userAgent)

    const { accessToken, refreshToken } = tokenService.generateTokens(userId, device)

    await tokenService.saveRefreshToken(userId, device, refreshToken)

    return { accessToken: accessToken, refreshToken: refreshToken }
}

//TODO: 
async function createAndSendActivationLink(email, userId) {
    const generatedUuid = uuid.v4()
    const activationLink = process.env.FRONTEND_URL + generatedUuid
    await mailService.sendActivationMail(email, activationLink)
    await activationQueries.createLink(userId, generatedUuid)
}

class authService {
    async login(email, password, userAgent) {
        const user = await userQueries.receiveUserByEmail(email)

        if (!user)
            throw ApiError.badRequest('User not found')

        comparePassword(user.password, password)

        const tokens = await authenticateUser(user.id, userAgent)

        return { tokens: tokens, user: { ...user.dataValues, password: 'hidden' } }
    }

    async register(login, email, password, name, avatar, userAgent) {
        const hashPassword = await bcrypt.hash(password, 5)

        const _ = await userQueries.create(login, email, hashPassword, name, avatar)

        const user = await userQueries.receiveUserByEmail(email)

        // await createAndSendActivationLink(email, user.id) //TODO:

        const tokens = await authenticateUser(user.dataValues.id, userAgent)

        return { tokens: tokens, user: { ...user.dataValues, password: 'hidden' } }
    }

    async logout(refreshToken) {
        if (!refreshToken)
            throw ApiError.badRequest('Cookies not found')

        return await tokensQueries.expireRefreshToken(refreshToken)
    }

    async refreshActivation(userId) {
        const user = await userQueries.receiveUserServiceInfoById(userId)

        if (user.isActivated)
            throw ApiError.badRequest('User is arleady activated')

        await activationQueries.expireLink(userId)

        return await createAndSendActivationLink(user.email, user.id)
    }

    async activateAccount(userId) {
        return await userQueries.updateUser(userId, { isActivated: true })
    }

    async refreshToken(refreshToken) {
        if (!refreshToken)
            throw ApiError.badRequest('There was no refresh token')

        const validToken = await tokensQueries.receiveValidToken(refreshToken)

        if (!validToken)
            throw ApiError.badRequest('Token isn"t valid. Relogin, please.')

        return tokenService.generateAccess(validToken.userId, validToken.device)
    }

    async checkActivatedStatus(userId) {
        if (!userId) {
            throw ApiError.badRequest('There was no user')
        }

        const user = await userQueries.receiveUserServiceInfoById(userId)

        return { isActivated: user.dataValues.isActivated }
    }
}

module.exports = new authService()