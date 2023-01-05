const Router = require('express')
const contactsController = require('../../controllers/contactsController')
const wrapTry = require('../../wrappers/tryWrapper')
const router = new Router()

router.get('/',wrapTry(contactsController.getAll))
router.get('/:id',wrapTry(contactsController.getOne))
router.post('/add',wrapTry(contactsController.create))
router.post('/update',wrapTry(contactsController.update))
router.post('/remove',wrapTry(contactsController.delete))

module.exports = router