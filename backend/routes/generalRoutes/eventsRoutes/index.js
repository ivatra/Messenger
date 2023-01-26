const Router = require('express')
const router = new Router()

const eventsController = require('../../../controllers/eventsController')

router.get('/',eventsController.get)
router.post('/typing',eventsController.setTyping)
router.post('/messageRead',eventsController.setMessageRead)
module.exports = router