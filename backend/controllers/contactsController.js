const ApiError = require("../error/ApiError")
const { sendContactRequest,getContacts } = require("../service/pagesService")

class contactsController{
    async getAll(req, res,next) {
        try{
            const {isPending} = req.body
            const contacts = await getContacts(req.user.id,isPending || "accepted")
            return res.json(contacts)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res,next) {
        try{
            const {contactId} = req.body
            const contact = await sendContactRequest(req.user.id,contactId)
            return res.json(contact)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new contactsController()