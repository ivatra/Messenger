const ChatService = require('../service/chatService')

class ChatController {
  async createOrGet(req, res) {
    const { participantId, type } = req.body;
    const chatType = type || "individual";
    var [chat] = await ChatService.findChat(req.user.id, participantId, chatType)
    if (!chat)
      chat = await ChatService.createChat(req.user.id, participantId, chatType);
    // res.redirect(chat);
    return res.json(chat.id)
  }

  async getChatContent(req, res) {
    const { id } = req.params
    const chatContent = await ChatService.fetchChatContent(id, req.user.id)
    return res.json(chatContent)
  }

  async addChatParticipant(req, res) {
    const { participantId } = req.body
    await ChatService.addParticipantToChat(req.chatId, participantId)
    return res.json(`Participant ${participantId} added to chat ${req.chatId}`)
  }

  async removeChatParticipant(req, res) {
    const { participantId } = req.body

    await ChatService.destroyParticipantFromChat(req.chatId, participantId)
    return res.json(`Participant ${participantId} removed from chat ${req.chatId}`)
  }
}

module.exports = new ChatController()

