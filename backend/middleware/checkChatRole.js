const chatQueries = require("../database/postqre/queries/chatQueries")
const ApiError = require("../error/ApiError")

module.exports = function (role) {
  return async function (req, res, next) {
    const { participantId } = req.body
    const { id } = req.params
    const participant = chatQueries.receiveParticipant(participantId,req.params.chatId)
    // if (participant.dataValues.role != "ADMIN") {
    //   throw ApiError.forbidden(`User ${req.user.id} doesn't have privileges for chat ${id}`)
    // }
    next()
  }
}