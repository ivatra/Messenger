const chatService = require('../../service/chat/chatService');

class ChatController {
  async createOrGet(req, res) {
    const { participantId, type } = req.body;
    const chatType = type || "individual";
    let [chat] = await chatService.findChat(req.user.id, participantId, chatType);
    if (!chat)
      chat = await chatService.createChat(req.user.id, participantId, chatType);
    // res.redirect(chat.id);
    return res.json(chat.id)
  }

  async getChatContent(req, res) {
    const { chatId } = req.params
    const chatContent = await chatService.fetchChatContent(chatId, req.user.id)
    return res.json(chatContent)
  }

    async update(req, res) {
        const {chatId} = req.params
        const {name} = req.body
        var avatar

        if (req.files)
            avatar = req.files.avatar

        const elements = await chatService.updateChat(chatId, name, avatar)

        return res.json(`${elements} in chat ${chatId} succecsfuly updated.`);
    }

  async addChatParticipant(req, res) {
    const { participantId } = req.body
    const { chatId } = req.params
    await chatService.addParticipantToChat(chatId, participantId, true)
    return res.json(`Participant ${participantId} added to chat ${chatId}`)
  }

  async removeChatParticipant(req, res) {
    const { participantId } = req.body
    const { chatId } = req.params
    await chatService.destroyParticipantFromChat(chatId, participantId)
    return res.json(`Participant ${participantId} removed from chat ${chatId}`)
  }

}

module.exports = new ChatController()

