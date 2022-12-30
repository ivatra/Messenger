const { MongoClient } = require('mongodb')
module.exports =  new MongoClient(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
