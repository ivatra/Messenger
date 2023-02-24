const { Attachement } = require("../models/attachementModel")
const { Message,MessageVector } = require("../models/messageModel")


class messageQueries {
    async createMessage(chatId,content,senderId){
        return await Message.create({
            chatId: chatId,
            content: content,
            senderId: senderId,
        })
    }

    async createMessageVector(messageId,contentCopy){
        return await MessageVector.create({
            messageId:messageId,
            contentCopy:contentCopy
        })
    }



    async receiveMessage(messageId) {
        return await Message.findOne({
            where: {
                id: messageId,
            },include: {
                model: Attachement,
                attributes: ['type', 'url']
              }
        })
    }

    async updateMessage(messageId, values) {
        return await Message.update( values , {
            where: {
                id: messageId
            }
        })
    }
    async receiveByChat(chatId,limit,offset){
        return await Message.findAll({
            where: {
                chatId: chatId
            },
            include: {
                model: Attachement,
                attributes: ['type', 'url']
            },
            limit: limit,
            offset: offset,
            attributes: ['id', 'content', 'senderId', 'createdAt','isRead'],
            order:['id']
        })
    }
}

module.exports = new messageQueries()