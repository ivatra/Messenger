const ApiError = require('../../error/ApiError')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const useragent = require('useragent');

const userQueries = require("../../database/postqre/queries/userQueries")
const mailService = require('./mailService')
const tokenService = require('./tokenService')


function comparePassword(rightPassword, usersPassword) {
    const isPasswordCorrect = bcrypt.compareSync(usersPassword, rightPassword)
    if (!isPasswordCorrect)
        throw ApiError.Internal('Incorrent password')
}

function parseDevice(userAgent) {
    const agent = useragent.parse(userAgent);
    const browser = agent.device.family + ' ' + agent.device.major
    const os = agent.os.family + ' ' + agent.os.major
    return { browser: browser, os: os }
}

async function authenticateUser(userId,userAgent){
    const { accessToken, refreshToken } = tokenService.generateTokens(userId)

    const device = parseDevice(userAgent)

    await tokenService.saveRefreshToken(userId, refreshToken, device)

    return accessToken
}

class authService {
    async login(email, password,userAgent) {
        const user = await userQueries.receiveUserByEmail(email)
        if (!user)
            throw ApiError.Internal('User not found')

        comparePassword(user.password, password)

        const accessToken = await authenticateUser(user.id,userAgent) 

        return accessToken
    }

    async register(login, email, password, name, avatar, userAgent) {
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await userQueries.create(login, email, hashPassword, name, avatar)

        const activationLink = uuid.v4()
        await mailService.sendActivationMail(email, activationLink)

        const accessToken = await authenticateUser(user.id,userAgent) 

        return accessToken
    }

    async activateAccount() {

    }

    async refreshToken(userId,device) {


    }
}

module.exports = new authService()