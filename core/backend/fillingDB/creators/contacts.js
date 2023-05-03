const contactsService = require("../../service/pages/contactsService")


module.exports = async function (args) {
    await contactsService.sendContactRequest(args.user1, args.user2)
}