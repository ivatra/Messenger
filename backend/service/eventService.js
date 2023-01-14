const mongoClient = require('../mongo')
const events = mongoClient.db('Messenger').collection('events');

class eventService{
    async get(userId){
        return await events.find({recipientId:"cca23be1-897c-42a3-bfc3-178d96a73cba"}).toArray()
    }
}

module.exports = new eventService()