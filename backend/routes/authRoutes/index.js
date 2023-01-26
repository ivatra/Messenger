const Router = require('express')
const router = new Router()
const authController = require('../../controllers/authController')
const checkAuth = require('../../middleware/start/checkAuth')
const registerMiddleware = require('../../middleware/registerMiddleware')


router.post('/registration',registerMiddleware,authController.registration)
router.post('/login',authController.login)
router.get('/auth',checkAuth,authController.check)

module.exports = router