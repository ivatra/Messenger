const Router = require('express')
const router = new Router()
const authController = require('../../controllers/authController')
const checkAuth = require('../../middleware/start/checkAuth')
const registerMiddleware = require('../../middleware/registerMiddleware')


router.post('/registration',registerMiddleware,authController.registration)
router.post('/login',authController.login)
router.post('/activate/:link',authController.activate)
router.get('/refresh',checkAuth,authController.refresh)

module.exports = router