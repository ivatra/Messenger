const Router = require('express')
const router = new Router()

const authMiddleware = require('../middleware/authMiddleware')
const pagesRouter = require('./pagesRoutes/index')
const authRouter = require('./authRouter')
const chatRouter = require('./chatRoutes/index')
const eventsRouter = require('./eventsRoutes/index')
const updateUserActivityMiddleWare = require('../middleware/updateUserActivityMiddleWare')

router.use('/pages',authMiddleware,updateUserActivityMiddleWare, pagesRouter)
router.use('/chat',authMiddleware,updateUserActivityMiddleWare,chatRouter)
router.use('/events', authMiddleware,updateUserActivityMiddleWare,eventsRouter)
router.use('/auth',authRouter)

module.exports = router