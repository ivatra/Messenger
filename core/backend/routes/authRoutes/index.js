const Router = require('express')
const router = new Router()
const authController = require('../../controllers/authController')
const checkAuth = require('../../middleware/start/checkAuth')
const registerMiddleware = require('../../middleware/registerMiddleware')
const validateActivation = require('../../middleware/validateActivation')

router.post('/registration',registerMiddleware,authController.registration)
router.post('/login',authController.login)
router.post('/logout',authController.logout)
router.post('/activate/:link',validateActivation,authController.activate)
router.get('/refreshActivation',checkAuth,authController.refreshActivation)
router.get('/refreshToken',authController.refreshToken)

module.exports = router