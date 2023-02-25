const Router = require('express')
const router = new Router()

const pagesRouter = require('./pagesRoutes/index')
const chatRouter = require('./chatRoutes/index')
const eventsRouter = require('./eventsRoutes/index')
const userRoutes = require('./userRoutes/index')
const searchRoutes = require('./searchRoutes/index')

router.use('/profile', userRoutes)
router.use('/pages', pagesRouter)
router.use('/chat', chatRouter)
router.use('/events', eventsRouter)
router.use('/search', (req, res, next) => {
    const { message } = req.body
    if (message.length > 2)
        next()
    else res.json([])
}, searchRoutes)

module.exports = router
