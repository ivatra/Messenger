const svgCaptcha = require('svg-captcha')

class captchaService{
    async createCaptcha(){
        return svgCaptcha.create()
    }

    async compareCaptcha(captchaId,answer){

    }
}

module.exports = new captchaService()