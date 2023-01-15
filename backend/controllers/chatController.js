const ChatService = require('../service/chatService')

class ChatController {
  async createOrGet(req, res) {
    const { participantId, type } = req.body;
    const chatType = type || "individual";
    var [chat] = await ChatService.findChat(req.user.id, participantId, chatType)
    if (!chat)
      chat = await ChatService.createChat(req.user.id, participantId, chatType);
    // res.redirect(chat.id);
    return res.json(chat.id)
  }

  async getChatContent(req, res) {
    const { chatId } = req.params
    const chatContent = await ChatService.fetchChatContent(chatId, req.user.id)
    return res.json(chatContent)
  }

  async addChatParticipant(req, res) {
    const { participantId } = req.body
    const {chatId} =  req.params
    await ChatService.addParticipantToChat(chatId, participantId,true)
    return res.json(`Participant ${participantId} added to chat ${chatId}`)
  }

  async removeChatParticipant(req, res) {
    const { participantId } = req.body
    const {chatId} =  req.params
    await ChatService.destroyParticipantFromChat(chatId, participantId)
    return res.json(`Participant ${participantId} removed from chat ${chatId}`)
  }
}

module.exports = new ChatController()

