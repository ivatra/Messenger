const attachementsQueries = require('../../database/postqre/queries/attachementsQueries');

class AttachementService {
    async fetchAll(chatId, limit, offset) {
        return await attachementsQueries.receiveAll(chatId,limit,offset)
    }

    async fetchOne(chatId, attachementId) {
        return await attachementsQueries.receiveOne(chatId,attachementId)}


    async create(type, url,messageId) {
        return await attachementsQueries.create(type,url,messageId)
    }

}

module.exports = new AttachementService()