const Router = require('express')
const contactsController = require('../../controllers/contactsController')
const router = new Router()

router.get('/',contactsController.getAll)
router.post('/',contactsController.create)

module.exports = router