const Router = require('express')
const router = new Router()

const path = require('path')
const fs = require('fs')

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
    
router.get('/static/images/:id', (req, res) => {
    const { id } = req.params;
    const imagePath = path.join(__dirname, '../static', `${id}`);
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            const defaultImagePath = path.join(__dirname, '../static', `defaultImage.jpg`);
            res.sendFile(defaultImagePath)
        }
        else res.sendFile(imagePath);
    });
});


module.exports = router