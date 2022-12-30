const Router = require('express')
const router = new Router()
const userController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/',userController.getOne)

module.exports = router