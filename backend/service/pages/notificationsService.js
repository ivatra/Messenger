const eventsQueries = require("../../database/mongo/queries/eventsQueries");

class notificationsService {
    async getAll(userId) {
        const events = await eventsQueries.receiveEvents(userId)
        const notificatedEvents = events.filter(event => 
                                                event.notify === true
                                                && event.content.status != "Received Message")
        return notificatedEvents
    }
}

module.exports = new notificationsService()