require('dotenv').config()
const express = require('express')
const cors = require('cors')
// require('express-async-errors')
const fileupload = require('express-fileupload')
const path = require('path')
const mongoCl = require('./database/mongo/mongo')

const sequelize = require('./database/postqre/postgre')
const models = require('./database/postqre/models/index')
const modelHooks = require('./database/postqre/hooks/index')
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
// event : u were added to chat/kicked // DONE
// is typing event // DONE
// set message readen // DONE
// output contact logic to contactservice file // DONE
// sdelat norm error handling.contacts change status for example // DONE
// change get chat content.if user is participant of chat // DONE
// get notifications function
// set sent status false when it sent
// middleware check for count of queries per 10 seconds for example
// do email authorization
// cloudfare test


//test contacts logic / 