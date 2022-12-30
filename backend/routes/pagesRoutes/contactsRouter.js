const Router = require('express')
const router = new Router()


router.get('/',contactsController.getAll)

module.exports = router