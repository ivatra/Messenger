const Router = require('express')
const router = new Router()

const attachementRouter = require('./attachementsRouter')
const messageRouter = require('./messageRouter')
const participantsRouter = require('./participantsRouter')
const ChatController = require('../../controllers/chatController')

const checkChatRole = require('../../middleware/checkChatRole')

router.get('/',ChatController.createOrGet)
router.get('/:chatId',ChatController.getChatContent)
router.post('/:chatId/update',checkChatRole('ADMIN'),ChatController.update)
router.use('/:chatId/participants',checkChatRole('ADMIN'),participantsRouter)
router.use('/:chatId/attachements',attachementRouter)
router.use('/:chatId/messages',messageRouter)

module.exports = router