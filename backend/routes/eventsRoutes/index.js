const Router = require('express')
const router = new Router()

const eventsController = require('../../controllers/eventsController')

router.get('/',eventsController.get)
router.post('/typing',eventsController.get)
module.exports = router