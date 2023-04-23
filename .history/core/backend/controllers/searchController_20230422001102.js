const searchService = require("../service/searchService")

class searchController{
    async getInbox(req, res) {
        const { message } = req.body
        
        const similaratiesFound = await searchService.searchInInbox(req.user.id,message)
        return res.json(similaratiesFound)
    }

    async getContacts(req, res) {
        const {message} = req.body

        const similaratiesFound = await searchService.searchInContacts(req.user.id,message)
        return res.json(similaratiesFound)

    }

    async getChatMessages(req, res) {
        const {chatId} = req.params
        const {message} = req.body

        const similaratiesFound = await searchService.searchInChat(chatId,message)
        return res.json(similaratiesFound)
    }
}


module.exports = new searchController()