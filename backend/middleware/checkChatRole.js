const ApiError = require("../error/ApiError")
const { ChatParticipant } = require("../models")

module.exports = function (role) {
  return async function (req, res, next) {
    const { participantId } = req.body
    const { id } = req.params
    req.chatId = id
    const participant = await ChatParticipant.findOne({
      where: {
        role: role,
        userId: participantId,
        chatId: id
      }
    })
    // if (!participant) {
    //   throw ApiError.forbidden(`User ${req.user.id} doesn't have privileges for chat ${id}`)
    // }
    next()
  }
}