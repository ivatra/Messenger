const Router = require('express')
const router = new Router()

const pagesRouter = require('./pagesRoutes/index')
const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const chatRouter = require('./chatRoutes/index')

router.use('/pages',pagesRouter)
router.use('/user/:id',userRouter)
router.use('/auth',authRouter)
router.use('/chat/:id',chatRouter)

module.exports = router