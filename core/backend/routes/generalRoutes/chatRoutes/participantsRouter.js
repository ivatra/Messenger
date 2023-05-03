const express = require('express');
const router = express.Router({ mergeParams: true });

const ChatController = require('../../../controllers/chat/chatController')

router.post('',ChatController.addChatParticipant)
router.delete('',ChatController.removeChatParticipant)

module.exports = router