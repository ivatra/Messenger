const chatService = require('../../service/chat/chatService')

module.exports = async function (args) {
    try {
        await chatService.createChat(args.user1, args.user2, args.chatType)
    } catch (e) {
        return e
    }
}
