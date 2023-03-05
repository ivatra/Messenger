const Router = require('express')
const contactsController = require('../../../controllers/pages/contactsController')
const router = new Router()

router.get('/',contactsController.getAll)
router.get('/:id',contactsController.getOne)
router.post('/add',contactsController.create)
router.post('/update',contactsController.update)
router.post('/remove',contactsController.delete)

module.exports = router