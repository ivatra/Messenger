const Router = require('express')
const router = new Router()
const pagesRouter = require('./pagesRoutes/index')
const chatRouter = require('./chatRoutes/index')
const eventsRouter = require('./eventsRoutes/index')
const userRoutes = require('./userRoutes/index')
const searchRoutes = require('./searchRoutes/index')
const paginationMiddleware = require('../../middleware/paginationMiddleware')
const attachementRouter = require('./chatRoutes/attachementsRouter')

router.use('/user', userRoutes)
router.use('/pages', paginationMiddleware, pagesRouter)
router.use('/chat', chatRouter)
router.use('/events', eventsRouter)
router.use('/search', paginationMiddleware, searchRoutes)
router.use('/attachements', attachementRouter)

module.exports = router
