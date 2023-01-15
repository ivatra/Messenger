const express = require('express');
const router = express.Router({ mergeParams: true });

const ChatController = require('../../controllers/chatController')

router.post('/add',ChatController.addChatParticipant)
router.post('/remove',ChatController.removeChatParticipant)

module.exports = router