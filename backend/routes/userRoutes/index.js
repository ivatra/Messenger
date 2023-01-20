const Router = require('express')
const router = new Router()

const userController = require('../../controllers/userController')

router.use('/update',userController.update)

module.exports = router