const messageService = require('../../service/chat/messageService')


// получить вложение
// с вероятностью 50 на 50 его добавлять или не добавлять
// получить сообщения
// получить имена
// получать случайное имя как senderId
// получить случайный чат

// для случайных чатов нужно их создать
// чтобы создать случайные чаты нужно генерировать два случайных имени из names и генерировать chatType

module.exports = async function (args) {
    try{
        await messageService.createMessage(
            args.content,
            null,
            args.senderId,
            args.chatId
        )
    }catch(e){
        console.log(e)
    }
}