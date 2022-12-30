const Router = require('express')
const router = new Router()

const chatRouter = require('./chatRouter')
const attachementRouter = require('./attachementsRouter')
const messageRouter = require('./messageRouter')

router.use('/',)
router.use('/attachements',attachementRouter)
router.use('/messages',messageRouter)

module.exports = router