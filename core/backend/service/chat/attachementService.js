const attachementsQueries = require('../../database/postqre/queries/attachementsQueries');
const ApiError = require('../../error/ApiError');

class AttachementService {
    async fetchAll(chatId, limit, offset) {

        if(!chatId){
            throw ApiError.badRequest('No chatId passed')
        }
        const { rows: data, count } = await attachementsQueries.receiveAll(chatId, limit, offset)

        const dictStructAttachements = Object.fromEntries(data.map(attach => [attach.attachement.id, { ...attach.attachement.dataValues }]));

        return { data: dictStructAttachements, count }
    }

    async fetchOne(attachementId) {
        console.log(attachementId)
        if(!attachementId){
            throw ApiError.badRequest('No attachementId passed')
        }
        const attach = await attachementsQueries.receiveOne(attachementId)
        return attach

    }
    async create(type, url, messageId) {
        return await attachementsQueries.create(type, url, messageId)
    }

}

module.exports = new AttachementService()