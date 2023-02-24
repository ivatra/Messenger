const svgCaptcha = require('svg-captcha')
const captchaQueries = require('../database/mongo/queries/captchaQueries')
const uuid = require('uuid')
const ApiError = require('../error/ApiError')
class captchaService {
    async createCaptcha() {
        const captcha = svgCaptcha.create();
        const generatedId = uuid.v4();
    
        await captchaQueries.createCaptcha(generatedId, captcha.text);
    
        return { 
            id: generatedId, 
            data: captcha 
        };
    }

    async compareCaptcha(captchaId, answer) {
        const captcha = await captchaQueries.receiveCaptcha(captchaId)
        if (!captcha)
            throw ApiError.Internal('Something went wrong with captcha. Try again')

        if (answer !== captcha.answer) {
            throw ApiError.badRequest('Captcha is wrong. Try again')
        }
        return 'Captcha is right.'

    }
}

module.exports = new captchaService()