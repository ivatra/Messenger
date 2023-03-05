const inboxQueries = require("../../database/postqre/queries/inboxQueries")

class inBoxService{
    async getInbox(userId) {
        return await inboxQueries.receiveUserInboxes(userId)
      }
}

module.exports = new inBoxService()