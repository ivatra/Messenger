const Router = require('express')
const notificationsController = require('../../../controllers/pages/notificationsController')
const router = new Router()

router.get('/',notificationsController.getAll)

module.exports = router