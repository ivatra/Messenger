const Router = require('express')
const router = new Router()

const attachementRouter = require('./attachementsRouter')
const messageRouter = require('./messageRouter')
const ChatController = require('../../controllers/chatController')


router.get('/',ChatController.createOrGet)
router.get('/:id',ChatController.getChat)
// router.use('/attachements',attachementRouter)
// router.use('/messages',messageRouter)

module.exports = router