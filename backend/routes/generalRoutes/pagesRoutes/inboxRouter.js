const Router = require('express')
const router = new Router()
const inBoxController = require('../../../controllers/pages/inBoxController')

router.get('/',inBoxController.getAll)

module.exports = router