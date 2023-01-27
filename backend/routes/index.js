const Router = require('express')
const router = new Router()

const authRoutes = require('./authRoutes/index')
const generalRoutes = require('./generalRoutes/index')
const captchaRoutes = require('./captchaRoutes/index')

const checkAuth = require('../middleware/start/checkAuth')
const checkRequestsCount = require('../middleware/start/checkRequestsCount')
const updateUserActivity = require('../middleware/start/updateUserActivity')


router.use('/auth', authRoutes)

router.use('/captcha',
    checkAuth,
    captchaRoutes)

router.use('/',
    // checkAuth,
    // checkRequestsCount,
    // updateUserActivity,
    generalRoutes)

module.exports = router