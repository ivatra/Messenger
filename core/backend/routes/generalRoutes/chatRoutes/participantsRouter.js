const express = require('express');
const router = express.Router({ mergeParams: true });

const ChatController = require('../../../controllers/chat/chatController')

router.post('/add',ChatController.addChatParticipant)
router.delete('/remove',ChatController.removeChatParticipant)

module.exports = router