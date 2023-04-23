const Router = require('express')
const contactsController = require('../../../controllers/pages/contactsController')
const router = new Router()

router.get('/', contactsController.getAll)
router.get('/:id', contactsController.getOne)
router.post('/:id/add', contactsController.create)
router.put('/:id/update', contactsController.update)
router.delete('/:id/remove', contactsController.delete)

module.exports = router