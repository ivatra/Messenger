require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')

const PORT = process.env.PORT || 5000

const mongoCl = require('./database/mongo/mongo')
const sequelize = require('./database/postqre/postgre')
const models = require('./database/postqre/models/index')
const modelHooks = require('./database/postqre/hooks/index')

const routes = require('./routes/index')

const errorHandler = require('./middleware/errorHandling')

const runSheduler = require('./sheduler/runSheduler')
const fillingDB = require('./fillingDB')

const app = express()

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};

const startedTIME = Date.now()

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use(cookieParser())

app.use('/api', routes)

app.use(errorHandler)
const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        await mongoCl.connect()
        // fillingDB.fillMessages()
        await runSheduler()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
            console.log(`TIME SPENT OF LAUNCH : ${(Date.now() - startedTIME) / 1000} SEC`)}
        )
    } catch (e) {
        console.log(e)
    }
}

start()




// @TODO : Validate activation set frontend url
// @TODO 
// @TODO : Group chat creator got to be a admin


//@POSSIBLE PROBLEMS :
// it accepts gif images
// middleware check for counts of queries is dependent on sheduler time check


//@ Хотелось бы в будущем : обработка ошибок с data и месседжом.Откладка каждого запроса!