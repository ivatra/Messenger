const express = require('express');
const paginationMiddleware = require('../../../middleware/paginationMiddleware');
const attachementController = require('../../../controllers/chat/attachementController');
const checkRequestsCount = require('../../../middleware/start/checkRequestsCount')
const router = express.Router({ mergeParams: true });

router.get('/',paginationMiddleware,attachementController.getAll)
router.get('/:attachId',paginationMiddleware,attachementController.getOne)
router.post('/',checkRequestsCount, attachementController.create)

module.exports = router