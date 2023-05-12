const Router = require('express')
const router = new Router()
const inBoxController = require('../../../controllers/pages/inBoxController')

router.get('/',inBoxController.getAll)
router.get('/pinned', inBoxController.getPinned)
router.get('/bychat', inBoxController.getByChat)

router.post('/:inboxId/pin', inBoxController.pinInbox)

module.exports = router