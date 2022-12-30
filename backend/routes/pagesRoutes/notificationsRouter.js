const Router = require('express')
const router = new Router()


router.get('/',notificationsController.getAll)

module.exports = router