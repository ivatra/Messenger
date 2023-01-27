const ApiError = require('../../error/ApiError')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const useragent = require('useragent');

const userQueries = require("../../database/postqre/queries/userQueries")
const mailService = require('./mailService')
const tokenService = require('./tokenService');
const activationQueries = require('../../database/mongo/queries/activationQueries');


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
    const device = parseDevice(userAgent)

    const { accessToken, refreshToken } = tokenService.generateTokens(userId,device)


    await tokenService.saveRefreshToken(userId, device, refreshToken)

    return { accessToken: accessToken, refreshToken: refreshToken }
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

        // const user = await userQueries.create(login, email, hashPassword, name, avatar)

        const generatedUuid = uuid.v4()
        const activationLink = process.env.API_URL + '/api/activate/' + generatedUuid 
        await mailService.sendActivationMail(email, activationLink)
        await activationQueries.createLink(1,generatedUuid)

        const tokens = await authenticateUser(1,userAgent) 

        return tokens
    }

    async activateAccount() {

    }

    async refreshToken(userId,device) {


    }
}

module.exports = new authService()