const express = require('express');
const messageController = require('../../../controllers/chat/messageController');
const paginationMiddleware = require('../../../middleware/paginationMiddleware');
const checkRequestsCount = require('../../../middleware/start/checkRequestsCount')
const router = express.Router({ mergeParams: true });

router.get('/',paginationMiddleware,messageController.getAll)
router.post('/', checkRequestsCount,messageController.create)

module.exports = router