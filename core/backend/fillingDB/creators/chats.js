const chatService = require('../../service/chat/chatService')
const contactsService = require('../../service/pages/contactsService')
const userService = require('../../service/userService')

module.exports = async function (args) {
    try {
        if(args.chatType === 'individual'){
            await chatService.createIndividualChat(args.user1, args.user2)
        }else{
            const firstUser = await contactsService.getContact(args.user1)
            const secondUser = await contactsService.getContact(args.user2)
            await chatService.createGroupChat(args.user1,[args.user2],'defaultAvatar.jpg',`Chat with ${firstUser.dataValues.name} and ${secondUser.dataValues.name}`)
        }
    } catch (e) {
        return e
    }
}
