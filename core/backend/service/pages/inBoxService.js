const inboxQueries = require("../../database/postqre/queries/inboxQueries")
const ApiError = require("../../error/ApiError")

class inBoxService {
  async getInbox(userId, limit, offset) {
    return await inboxQueries.receiveInboxes(userId, limit, offset)
  }

  async getPinnedInboxes(userId) {
    return await inboxQueries.receivePinnedInboxes(userId)
  }

  async pinInbox(inboxId) {
    const inbox = await inboxQueries.receiveInboxById(inboxId)

    if (!inbox) {
      throw ApiError.badRequest(`Inbox with ID ${inboxId} not found`)
    }

    return await inbox.update({ isPinned: !inbox.isPinned })
  }
}

module.exports = new inBoxService()