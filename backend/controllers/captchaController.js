const captchaService = require("../service/captchaService")

class captchaController {
    async getCaptcha(req, res, next) {
        const captcha = await captchaService.createCaptcha()
        res.type('svg')
        console.log(captcha.id)
        return res.send(captcha.data)

    }

    async validateCaptcha(req, res, next) {
        const { id, answer } = req.body
        const result = await captchaService.compareCaptcha(id, answer)
        return res.json(result)

    }
}

module.exports = new captchaController()