const contactsService = require("../../service/pages/contactsService")

class contactsController {
        async getAll(req, res) {
                const { isPending } = req.body
                const contacts = await contactsService.getContacts(req.user.id, isPending || "accepted")
                return res.json(contacts)
        }
        async getOne(req, res) {
                const { id } = req.params
                const contact = await contactsService.getContact(id)
                return res.json(contact)
        }

        async create(req, res) {
                const { contactId } = req.body
                const contact = await contactsService.sendContactRequest(req.user.id, contactId)
                return res.json(contact)
        }

        async update(req, res) {
                const { contactId, status } = req.body
                const contact = await contactsService.changeContactStatus(req.user.id, contactId, status)
                return res.json(contact)
        }

        async delete(req, res) {
                const { contactId } = req.body
                const callback = await contactsService.removeContact(req.user.id, contactId)
                return res.json(callback)
        }
}

module.exports = new contactsController()