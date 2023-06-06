const { MessageMeta } = require("../../database/postqre/models/messageModel");
const { User } = require("../../database/postqre/models/userModel");
const messageQueries = require("../../database/postqre/queries/messageQueries");
const attachementService = require("../chat/attachementService")
const fileService = require("../misc/fileService");
const chatService = require("./chatService");


async function handleMentioned(messages, userId) {
    for (let i = 0; i < messages.length; i++) {
        const user = await User.findByPk(userId)
        const content = messages[i].dataValues.content

        const contentWords = content.split(' ')

        for (let word in contentWords) {
            if (word.startsWith('@')) {
                word = word.slice(1)
                if (word === 'all' || word === user.dataValues.login) {
                    messages[i].dataValues.mentioned = true
                } else messages[i].dataValues.mentioned = false
            } else messages[i].dataValues.mentioned = false
        }

    }
    return messages
}


//fetch message
//get its index
//receive by index with limit
//send response to frontend
//

class MessageService {
    async fetchMessages(userId, chatId, limit, offset) {
        await chatService.checkForMemberingInChat(userId, chatId)

        const { count, rows: messages } = await messageQueries.receiveByChat(chatId, userId, limit, offset)

        for await (var message of messages) {
            if (userId !== message.senderId) {
                const msgMeta = await MessageMeta.findOne({ where: { messageId: message.id } })
                if (msgMeta) {
                    message.dataValues.isRead = msgMeta.isRead
                    message.dataValues.isMentioned = msgMeta.isMentioned
                }
            } else {
                message.dataValues.isMentioned = false
            }
        }


        return { data: messages, count: count }
    }

    async fetchByMessages(userId, chatId, limit, msgIndex) {
        const { count, rows: messages } = await messageQueries.receiveByMessage(limit, chatId, msgIndex)
        return { data: messages, count: count }
    }

    async createMessage(content, attachement, senderId, chatId) {
        const message = await messageQueries.createMessage(chatId, content, senderId)
        
        if (attachement) {
            const fileName = await fileService.saveFile(attachement, attachement.name, 'attachements')
            const fileType = await fileService.getFileType(attachement.name)
            attachement = await attachementService.create(fileType, fileName, message.id)
        }


        return attachement ? { ...message.dataValues, attachement: attachement.dataValues } : message.dataValues
    }

}

module.exports = new MessageService()