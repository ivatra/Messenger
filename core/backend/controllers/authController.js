const tokensQueries = require('../database/mongo/queries/tokensQueries')
const authService = require('../service/auth/authService')
const dateService = require('../service/misc/dateService')

function sendTokens(res, tokens, user) {
    const timeSwamp = dateService.daysToTimeSwamp(process.env.JWT_REFRESH_LIFECYCLE)

    res.cookie('refreshToken', tokens.refreshToken, { maxAge: timeSwamp, httpOnly: true })
    return res.json({ token: tokens.accessToken, user: user })
}

class AuthController {
    async registration(req, res, next) {
        const { name, login, email, password } = req.body
        const avatar = req.avatar
        const userAgent = req.headers['user-agent']

        const result = await authService.register(login, email, password, name, avatar || 'defaultImage.jpg', userAgent)
        const timeSwamp = dateService.daysToTimeSwamp(process.env.JWT_REFRESH_LIFECYCLE)
        res.cookie('refreshToken', result.tokens.refreshToken, { maxAge: timeSwamp, httpOnly: true })
        return res.json({ accessToken: result.tokens.accessToken, user: result.user })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const userAgent = req.headers['user-agent']
        
        const result = await authService.login(email, password, userAgent)

        const timeSwamp = dateService.daysToTimeSwamp(process.env.JWT_REFRESH_LIFECYCLE)

        res.cookie('refreshToken', result.tokens.refreshToken, { maxAge: timeSwamp, httpOnly: true,secure:false })
        return res.json({ token: result.tokens.accessToken, profile: result.user })
    }

    async logout(req, res, next) {
        const { refreshToken } = req.cookies
        await authService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json('There has been a successful logout')

    }

    async activate(req, res, next) {
        const { link } = req.params
        const user = await authService.activateAccount(req.userId, link)
        return res.json({activatedPersonId:user.dataValues.id})
    }

    async refreshActivation(req, res, next) {

        await authService.refreshActivation(req.user.id)
        return res.json('New link succesfuly sent.')
    }

    async checkActivation(req,res,next){
        const isActivated = await authService.checkActivatedStatus(req.user.id)
        return res.json(isActivated)
    }

    async refreshToken(req, res, next) {
        const { refreshToken } = req.cookies

        const token = await authService.refreshToken(refreshToken)
        return res.json(token)
    }
}

module.exports = new AuthController()