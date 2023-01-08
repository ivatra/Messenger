const Router = require('express')
const router = new Router()

const authMiddleware = require('../middleware/authMiddleware')
const pagesRouter = require('./pagesRoutes/index')
const authRouter = require('./authRouter')
const chatRouter = require('./chatRoutes/index')

router.use('/pages',authMiddleware,pagesRouter)
router.use('/auth',authRouter)
router.use('/chat',authMiddleware,chatRouter)

module.exports = router