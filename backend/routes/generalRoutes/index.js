const Router = require('express')
const router = new Router()

const pagesRouter = require('./pagesRoutes/index')
const chatRouter = require('./chatRoutes/index')
const eventsRouter = require('./eventsRoutes/index')
const userRoutes = require('./userRoutes/index')

router.use('/profile',userRoutes)
router.use('/pages', pagesRouter)
router.use('/chat',chatRouter)
router.use('/events',eventsRouter)

module.exports = router