const contactsService = require("../../service/pages/contactsService")

class contactsController {
        async getAll(req, res) {
                const { id } = req.params
                const { status } = req.query
                const contacts = await contactsService.getContacts(req.user.id, status, req.offset, req.limit)
                return res.json(contacts)
        }
        async getOne(req, res) {
                const { id } = req.params
                const { status } = req.query
                const contact = await contactsService.getContact(req.user.id,id)
                return res.json(contact)
        }

        async create(req, res) {
                const { id } = req.params
                const contact = await contactsService.sendContactRequest(req.user.id, id)
                return res.json(contact)
        }

        async update(req, res) {
                const { id } = req.params
                const { status } = req.query
                const contact = await contactsService.changeContactStatus(req.user.id, id, status)
                return res.json(contact)
        }

        async delete(req, res) {
                const { id } = req.params
                const callback = await contactsService.removeContact(req.user.id, id)
                return res.json(callback)
        }
}

module.exports = new contactsController()