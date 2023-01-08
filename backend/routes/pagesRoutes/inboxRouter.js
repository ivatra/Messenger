const Router = require('express')
const router = new Router()
const inBoxController = require('../../controllers/inBoxController')
// const wrapTry = require('../../wrappers/tryWrapper')

// router.get('/',wrapTry(inBoxController.getAll))

module.exports = router