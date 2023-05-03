const authService = require('../../service/auth/authService');

const mails = ['mail.ru', 'gmail.com', 'yandex.ru', 'bingo.com', 'bebra.ru', 'kemerovorea.ru']


function generateMail() {
    return mails[Math.floor(Math.random() * mails.length)]
}

module.exports = async function (args) {
    const mail = generateMail()
    
    await authService.register(
        args.name,
        `${args.name}@${mail}`,
        args.name,
        args.name,
        'defaultImage.jpg',
        {})
}