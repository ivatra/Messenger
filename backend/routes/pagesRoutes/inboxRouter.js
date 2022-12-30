const Router = require('express')
const router = new Router()


router.get('/',inboxController.getAll)

module.exports = router