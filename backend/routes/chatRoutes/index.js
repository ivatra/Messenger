const Router = require('express')
const router = new Router()

const attachementRouter = require('./attachementsRouter')
const messageRouter = require('./messageRouter')
const participantsRouter = require('./participantsRouter')
const ChatController = require('../../controllers/chatController')

const checkChatRole = require('../../middleware/checkChatRole')

router.get('/',ChatController.createOrGet)
router.get('/:id',ChatController.getChatContent)
router.use('/:id/participants',checkChatRole('ADMIN'),participantsRouter)
// router.use('/attachements',attachementRouter)
router.use('/:id/messages',messageRouter)

module.exports = router