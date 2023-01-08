const { Message } = require("../models/messageModel")
const {Attachement} = require('../models/attachementModel')
class MessageService{
    async fetchMessages(chatId,limit,offset){
        return await Message.findAll({
            where:{
                chatId:chatId
            },
            include:{
              model:Attachement,
              attributes:['type','url']  
            },
            limit:limit,
            offset:offset,
            attributes:['id','content','senderId']
        })
    }

    async createMessage(content){
        return await Message.create({
          chatId:content.chatId,
          content:content.content,
          senderId:content.userId,
          attachementId:content.attachementId  
        })
    }

}

module.exports = new MessageService()