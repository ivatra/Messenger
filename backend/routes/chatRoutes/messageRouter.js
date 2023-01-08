const express = require('express');
const messageController = require('../../controllers/messageController');
const paginationMiddleware = require('../../middleware/paginationMiddleware');
const router = express.Router({ mergeParams: true });

router.get('/',paginationMiddleware,messageController.getAll)
router.post('/',messageController.create)

module.exports = router