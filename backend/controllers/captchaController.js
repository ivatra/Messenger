const captchaService = require("../service/captchaService")

class captchaController {
    async getCaptcha(req, res, next) {
        const captcha = await captchaService.createCaptcha()
        req.captcha = captcha.text;
        res.type('svg');
        return res.status(200).send(captcha.data);

    }

    async validateCaptcha(req, res, next) {
        const { captchaId, answer } = req.body
        const result = await captchaService.compareCaptcha(captchaId, answer)
        return res.json(result)

    }
}

module.exports = new captchaController()