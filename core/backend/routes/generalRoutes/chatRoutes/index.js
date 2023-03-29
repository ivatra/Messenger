const Router = require('express')
const router = new Router()

const attachementRouter = require('./attachementsRouter')
const messageRouter = require('./messageRouter')
const participantsRouter = require('./participantsRouter')
const ChatController = require('../../../controllers/chat/chatController')

const checkChatRole = require('../../../middleware/checkChatRole')

router.get('/individual',ChatController.createOrGetIndividualChat)
router.post('/group', ChatController.createGroupChat)
router.get('/:chatId',ChatController.getChatContent)
router.post('/:chatId/update',checkChatRole('ADMIN'),ChatController.update)
router.use('/:chatId/participants',checkChatRole('ADMIN'),participantsRouter)
router.use('/:chatId/attachements',attachementRouter)
router.use('/:chatId/messages',messageRouter)

module.exports = router