const chatQueries = require("../database/postqre/queries/chatQueries")
const ApiError = require("../error/ApiError")

module.exports = function (role) {
  return async function (req, res, next) {
    const participant = chatQueries.receiveParticipant(req.user.id,req.params.chatId)
    // if (participant.role != "ADMIN") {
    //   throw ApiError.forbidden(`User ${req.user.id} doesn't have privileges for chat ${id}`)
    // }
    next()
  }
}