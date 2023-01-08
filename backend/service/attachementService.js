const ApiError = require('../error/ApiError');
const { Attachement } = require('../models');
const mime = require('mime-types');

class AttachementService{
    async fetchAll(chatId,limit,offset){
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
            attributes:['createdAt']
        })
    }

    async create(type,url){
        return await Attachement.create({
            type:type,
            url:url
        })
    }

}

module.exports = new AttachementService()