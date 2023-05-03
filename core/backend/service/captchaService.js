const svgCaptcha = require('svg-captcha')
const captchaQueries = require('../database/mongo/queries/captchaQueries')
const uuid = require('uuid')
const ApiError = require('../error/ApiError');
const userQueries = require('../database/postqre/queries/userQueries');
class captchaService {
    async createCaptcha() {
        const captcha = svgCaptcha.create({ background: '#FFFFFF', size: '5', color: false, width: 200, height: 70 });
        const generatedId = uuid.v4();
        console.log(captcha.text)
        await captchaQueries.createCaptcha(generatedId, captcha.text);
        return {
            id: generatedId,
            data: captcha.data
        };
    }

    async compareCaptcha(userId,captchaId, answer) {
        const captcha = await captchaQueries.receiveCaptcha(captchaId)
        if (!captcha)
            throw ApiError.Internal('Something went wrong with captcha. Try again')

        if (answer !== captcha.answer) {
            throw ApiError.badRequest('Captcha is wrong. Try again')
        }

        await userQueries.resetUserRequestsCount(userId)

        return 'Captcha is right.'

    }
}

module.exports = new captchaService()