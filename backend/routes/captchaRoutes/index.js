const Router = require('express')
const captchaController = require('../../controllers/captchaController')
const router = new Router()


router.get('/',captchaController.getCaptcha)
router.post('/',captchaController.validateCaptcha)

module.exports = router