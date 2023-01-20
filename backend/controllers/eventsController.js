const eventService = require("../service/eventService")


class EventsController{
    async get(req,res,next){
        const userId = req.user.id
        const events = await eventService.get(userId)
        res.json(events)
        // return await eventService.setEventsSent(events)
    }

    async setTyping(req,res){
        const {chatId} = req.body
        const userId = req.user.id
        await eventService.setTyping(userId,chatId)
        return res.json(`Event is typing successfully sent to chat ${chatId}`)
    }

    async setMessageRead(req,res){
        const {messageId,chatId} = req.body
        const userId = req.user.id
        await eventService.setMessageRead(userId,messageId,chatId)
        return res.json(`Event messageRead successfully sent to chat ${chatId}`)
    }
}

module.exports = new EventsController()