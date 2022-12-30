const Router = require('express')
const router = new Router()

const inboxRouter = require('./inboxRouter')
const contactsRouter = require('./contactsRouter')
const notificationsRouter = require('./notificationsRouter')

router.use('/inbox',inboxRouter)
router.use('/contacts',contactsRouter)
router.use('/notifications',notificationsRouter)

module.exports = router