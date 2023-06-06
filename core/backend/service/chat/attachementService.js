const attachementsQueries = require('../../database/postqre/queries/attachementsQueries');

class AttachementService {
    async fetchAll(chatId, limit, offset) {
        const {rows:data,count} = await attachementsQueries.receiveAll(chatId,limit,offset)
        
        return {data,count}
    }

    async fetchOne(chatId, attachementId) {
        return await attachementsQueries.receiveOne(chatId,attachementId)}


    async create(type, url,messageId) {
        return await attachementsQueries.create(type,url,messageId)
    }

}

module.exports = new AttachementService()