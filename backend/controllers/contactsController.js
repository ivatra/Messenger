const PagesService = require("../service/pagesService")

class contactsController {
    async getAll(req, res, next) {
            const { isPending } = req.body
            const contacts = await PagesService.getContacts(req.user.id, isPending || "accepted")
            return res.json(contacts)
    }
    async getOne(req, res, next) {
            const { id } = req.params
            const contact = await PagesService.getContact(id)
            return res.json(contact)
    }

    async create(req, res, next) {
            const { contactId } = req.body
            const contact = await PagesService.sendContactRequest(req.user.id, contactId)
            return res.json(contact)
    }

    async update(req, res, next) {
            const { contactId, chatType } = req.body
            const contact = await PagesService.changeContactStatus(req.user.id, contactId, chatType)
            return res.json(contact)
    }

    async delete(req, res, next) {
            const { contactId } = req.body
            const callback = await PagesService.removeContact(req.user.id, contactId)
            return res.json(callback)
    }
}

module.exports = new contactsController()