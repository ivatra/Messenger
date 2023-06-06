const chatService = require('../../service/chat/chatService');

class ChatController {
  async createOrGetIndividualChat(req, res) {
    const { participantId } = req.query;
    let [chat] = await chatService.findChat(req.user.id, participantId, "individual");
    if (!chat) {
      chat = await chatService.createIndividualChat(req.user.id, participantId);
    }

    return res.json(chat.id);
  }

  async createGroupChat(req, res) {
    const { participants, name } = req.body;
    var avatar
    if (req.files) {
      avatar = req.files.avatar
    }
    const chat = await chatService.createGroupChat(req.user.id, participants, avatar, name);

    return res.json(chat);
  }

  async getChatContent(req, res) {
    const { chatId } = req.params
    const chatContent = await chatService.fetchChatContent(chatId, req.user.id)
    return res.json(chatContent)
  }

  async update(req, res) {
    const { chatId } = req.params
    const { name } = req.body
    var avatar
    if (req.files) {
      avatar = req.files.avatar
    }

    const outcame = await chatService.updateChat(chatId, name, avatar)
    return res.json(outcame)
  }

  async addChatParticipant(req, res) {
    const { userId } = req.body
    const { chatId } = req.params
    const part = await chatService.addParticipantToChat(chatId, userId, true, req.user.id, 'USER')
    return res.json(part)
  }

  async removeChatParticipant(req, res) {
    const { participantId } = req.body
    const { chatId } = req.params

    await chatService.destroyParticipantFromChat(chatId, participantId, req.user.id)
    return res.json(`Participant ${participantId} removed from chat ${chatId}`)
  }

}

module.exports = new ChatController()
