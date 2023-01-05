const ChatService = require('../service/chatService')

class ChatController {
    async createOrGet(req, res, next) {
        const { participiantId, type } = req.body;
        const chatType = type || "individual";
        var [chat] = await ChatService.findChat(req.user.id, participiantId)
        if (!chat)
            chat = await ChatService.createChat(req.user.id, participiantId, chatType);
        // res.redirect(chat);
        res.json(chat.id)
    }

    async getChat(req, res, next) {
        const { id } = req.params
        const chatContent = ChatService.getChatContent(id)
        return res.json(chatContent)
    }

    async addChatParticipiant(req, res, next) {

    }
}

module.exports = new ChatController()