const Router = require('express')
const router = new Router()

const ChatController = require('../../controllers/chatController')

router.post('/add',ChatController.addChatParticipant)
router.post('/remove',ChatController.removeChatParticipant)

module.exports = router