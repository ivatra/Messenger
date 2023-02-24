const Router = require('express')
const router = new Router()

const authRoutes = require('./authRoutes/index')
const generalRoutes = require('./generalRoutes/index')
const captchaRoutes = require('./captchaRoutes/index')
const checkAuth = require('../middleware/start/checkAuth')
const checkRequestsCount = require('../middleware/start/checkRequestsCount')
const updateUserActivity = require('../middleware/start/updateUserActivity')
const checkActivation = require('../middleware/start/checkActivation')


router.use('/auth', authRoutes)

router.use('/captcha',
    checkAuth,
    captchaRoutes)

router.use('/content',
    checkAuth,
    checkActivation,
    checkRequestsCount,
    updateUserActivity,
    generalRoutes)


module.exports = router