const Router = require('express')
const router = new Router()

const authMiddleware = require('../middleware/authMiddleware')
const pagesRouter = require('./pagesRoutes/index')
const authRouter = require('./authRouter')
const chatRouter = require('./chatRoutes/index')
const eventsRouter = require('./eventsRoutes/index')

router.use('/pages',authMiddleware,pagesRouter)
router.use('/chat',authMiddleware,chatRouter)
router.use('/events',authMiddleware,eventsRouter)
router.use('/auth',authRouter)

module.exports = router