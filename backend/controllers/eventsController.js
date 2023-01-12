const eventService = require("../service/eventService")


class EventsController{
    async get(req,res,next){
        const userId = req.user.id
        const events = await eventService.get(userId)
        return res.json(events)
    }

    async create(){

    }
}

module.exports = new EventsController()