const express = require('express');
const paginationMiddleware = require('../../middleware/paginationMiddleware');
const attachementController = require('../../controllers/attachementController');
const router = express.Router({ mergeParams: true });

router.get('/',paginationMiddleware,attachementController.getAll)
router.get('/:attachId',paginationMiddleware,attachementController.getOne)
router.post('/',attachementController.create)

module.exports = router