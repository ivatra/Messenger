require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5000

const mongoCl = require('./database/mongo/mongo')
const sequelize = require('./database/postqre/postgre')
const models = require('./database/postqre/models/index')
const modelHooks = require('./database/postqre/hooks/index')

const authRoutes = require('./routes/authRoutes/index')
const generalRoutes = require('./routes/generalRoutes/index')

const checkAuth = require('./middleware/start/checkAuth')
const checkRequestsCount = require('./middleware/start/checkRequestsCount')
const updateUserActivity = require('./middleware/start/updateUserActivity')


const errorHandler = require('./middleware/errorHandling')

const runSheduler = require('./sheduler/runSheduler')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))

app.use('/api/auth', authRoutes)

app.use('/api',
    checkAuth,
    checkRequestsCount,
    updateUserActivity,
    generalRoutes)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        await mongoCl.connect()
        await runSheduler()
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
// get notifications function // DONE
// set sent status false when it sent // DONE
// user avatar handling // DONE
// check file extension  // DONE
// sort in static by attachements , /userid/avatar , chat/avatar // DONE
// change group chat name and avatar // DONE
// change user name,avatar,login,password // DONE
// middleware check for count of queries per 10 seconds for example // DONE
// do email authorization
// update tokens when user updates password
// cloudfare test
// test contacts logic



//@POSSIBLE PROBLEMS :
// it accepts gif images