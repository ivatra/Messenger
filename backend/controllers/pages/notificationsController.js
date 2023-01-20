const notificationsService = require('../../service/pages/notificationsService')

class notificationController{
    async getAll(req, res,next) {
        const notifications = await notificationsService.getAll(req.user.id)
        return res.json(notifications)
    }
}

module.exports = new notificationController()