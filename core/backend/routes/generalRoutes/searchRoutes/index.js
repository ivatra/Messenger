const Router = require('express')
const router = new Router()

const searchController = require('../../../controllers/searchController')

router.get('/inbox',searchController.getInbox)
router.get('/contacts', searchController.getContacts)
router.get('/chat/:chatId',searchController.getChatMessages)

module.exports = router
