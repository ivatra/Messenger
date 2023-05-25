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
    const { participants, chatAvatar, chatName } = req.body;

    const chat = await chatService.createGroupChat(req.user.id, participants, chatAvatar, chatName);
    
    return res.json(chat.id);
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
    console.log('13')
    return res.json(outcame)
  }

  async addChatParticipant(req, res) {
    const { participantId } = req.body
    const { chatId } = req.params
    console.log('chat id = ', chatId)
    await chatService.addParticipantToChat(chatId, participantId, true)
    return res.json(`Participant ${participantId} added to chat ${chatId}`)
  }

  async removeChatParticipant(req, res) {
    const { participantId } = req.query
    const { chatId } = req.params
    console.log('chat id = ', chatId)
    await chatService.destroyParticipantFromChat(chatId, participantId,req.user.id)
    return res.json(`Participant ${participantId} removed from chat ${chatId}`)
  }

}

module.exports = new ChatController()

