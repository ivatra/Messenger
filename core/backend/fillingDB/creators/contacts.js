const contactsService = require("../../service/pages/contactsService")


module.exports = async function (args) {
    try {
        await contactsService.sendContactRequest(args.user1, args.user2)
    } catch (e) {
        console.log(e)
    }
}