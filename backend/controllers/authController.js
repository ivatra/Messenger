const authService = require('../service/auth/authService')

class AuthController {
    async registration(req, res, next) {
        const { name, login, email, password } = req.body
        const avatar = req.avatar
        const userAgent = req.headers['user-agent']

        const token = await authService.register(login, email, password, name, avatar, userAgent)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const userAgent = req.headers['user-agent']

        const token = await authService.login(email, password, userAgent)
        return res.json({ token })
    }

    async activate(req, res, next) {
        res.json({ message: 'everytihng works' })
    }

    async refresh(req, res, next) {
        res.json({ message: 'everytihng works' })
    }
}

module.exports = new AuthController()