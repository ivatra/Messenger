const inboxQueries = require("../../database/postqre/queries/inboxQueries")
const ApiError = require("../../error/ApiError")



function fetchProps(inboxes) {
  var arr = []
  for (var inbox of inboxes) {
    var obj = { id: inbox.id, chatId: inbox.chat.id, countUnreadMsgs: inbox.countUnreadMsgs, isPinned: inbox.isPinned, message: inbox.dataValues.message }

    if (inbox.chat.groupChat) {
      obj = { ...obj, name: inbox.chat.groupChat.name, avatar: inbox.chat.groupChat.avatar, chatType: 'group' }
    } else {
      obj = { ...obj, name: inbox.chat.participants[0].user.name, avatar: inbox.chat.participants[0].user.avatar, chatType: "individual" }
    }
    arr.push(obj)
  }
  return arr

}



class inBoxService {

  proceedInboxes(inboxes) {
    const updatedInboxes = fetchProps(inboxes)
    const dictStructInboxes = Object.fromEntries(updatedInboxes.map(inbox => [inbox.id, { ...inbox }]));
    return dictStructInboxes
  }
  async getInbox(userId, limit, offset) {
    const { inboxes, count } = await inboxQueries.receiveInboxes(userId, limit, offset)
    const proccedInboxes = this.proceedInboxes(inboxes)
    return { inboxes: proccedInboxes, count }
  }

  async getPinnedInboxes(userId) {
    const inboxes = await inboxQueries.receivePinnedInboxes(userId)
    return this.proceedInboxes(inboxes)
  }

  async pinInbox(inboxId) {
    const inbox = await inboxQueries.receiveInboxById(inboxId)

    if (!inbox) {
      throw ApiError.badRequest(`Inbox with ID ${inboxId} not found`)
    }

    return await inbox.update({ isPinned: !inbox.isPinned })
  }

  async getByChat(userId, chatId) {
    const inb = await inboxQueries.receiveInboxByChatId(userId, chatId)
    return this.proceedInboxes([inb[0]])
  }
}

module.exports = new inBoxService()