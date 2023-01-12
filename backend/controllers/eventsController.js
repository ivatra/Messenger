const eventService = require("../service/eventService")


class EventsController{
    async get(req,res,next){
        const events = await eventService(req.user.id)
        return res.json(events)
    }

    async create(){

    }
}

module.exports = new EventsController()