const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoClient = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = mongoClient


