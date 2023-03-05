const mongoClient = require('../mongo');
const captchaCollection = mongoClient.db('Messenger').collection('captcha');


class captchaQueries{
    async createCaptcha(captchaId,answer){
        const captcha = {
            captchaId:captchaId,
            answer:answer,
        }

        await captchaCollection.insertOne(captcha)
    }

    async receiveCaptcha(captchaId){
        return await captchaCollection.findOne({captchaId:captchaId})
    }

    async destroyCaptcha(){
        return await captchaCollection.deleteMany({})
    }
} 


module.exports = new captchaQueries()

