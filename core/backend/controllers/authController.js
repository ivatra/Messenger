const tokensQueries = require('../database/mongo/queries/tokensQueries')
const authService = require('../service/auth/authService')
const dateService = require('../service/misc/dateService')

function sendTokens(res, tokens) {
    const timeSwamp = dateService.daysToTimeSwamp(process.env.JWT_REFRESH_LIFECYCLE)

    res.cookie('refreshToken', tokens.refreshToken, { maxAge: timeSwamp, httpOnly: true })
    return res.json(tokens.accessToken)
}

class AuthController {
    async registration(req, res, next) {
        const { name, login, email, password } = req.body
        const avatar = req.avatar
        const userAgent = req.headers['user-agent']

        const tokens = await authService.register(login, email, password, name, avatar, userAgent)
        return sendTokens(res, tokens)
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const userAgent = req.headers['user-agent']

        const tokens = await authService.login(email, password, userAgent)

        return sendTokens(res, tokens)
    }

    async logout(req, res, next) {
        const { refreshToken } = req.cookies
        await authService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json('There has been a successful logout')

    }

    async activate(req, res, next) {
        const { link } = req.params

        await authService.activateAccount(req.userId, link)
        return res.json('An account succesfuly activated. Enjoy using website!')
    }

    async refreshActivation(req, res, next) {
        await authService.refreshActivation(req.user.id)
        return res.json('New link succesfuly sent.')
    }

    async refreshToken(req, res, next) {
        const {refreshToken} = req.cookies
        
        const token = await authService.refreshToken(refreshToken)
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        return res.json(token)
    }
}

module.exports = new AuthController()