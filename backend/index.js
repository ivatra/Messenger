require('dotenv').config()
const express = require('express')
const cors = require('cors')
// require('express-async-errors')
const fileupload = require('express-fileupload')
const path = require('path')
const mongoCl = require('./mongo')

const sequelize = require('./db')
const models = require('./models/index')
const modelHooks = require('./models/hooks/index')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandling')
const PORT = process.env.PORT || 5000
const runSheduler = require('./sheduler/runSheduler')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        await mongoCl.connect()
        runSheduler()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

// @TODO: FINISH GET INBOX,  /// DONE
// event : u were added to chat
// is typing event
// set message readen
// get notifications function