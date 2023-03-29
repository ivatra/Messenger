const chatQueries = require("../database/postqre/queries/chatQueries")


module.exports = function (role) {
  return async function (req, res, next) {
    const { chatId } = req.params
    const participant = await chatQueries.receiveParticipant(req.user.id,req.params.chatId)
    // if (participant.role != "ADMIN") {
    //   return res.status(401).json({ message: `User ${req.user.id} doesn't have privileges for chat ${chatId}` })
    // }
    // TODO:
    next()
  }
}