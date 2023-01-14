const authService = require('../service/authService')

class AuthController {
    async registration(req, res, next) {
        const { name, avatar, email, password } = req.body
        const token = authService.register(name, avatar, email, password)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const token = authService.login(email, password)
        return res.json({ token })
    }

    async check(req, res, next) {
        res.json({ message: 'everytihng works' })
    }
}

module.exports = new AuthController()