const Router = require('express')
const router = new Router()

const eventsController = require('../../controllers/eventsController')

router.get('/',eventsController.get)
router.post('/',eventsController.create)

module.exports = router