require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const models_hooks = require('./models/hooks')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandling')
const fileupload = require('express-fileupload')
const path = require('path')
const mongo_client = require('./mongo')

const PORT = process.env.PORT || 5000

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
        await mongo_client.connect()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()