const ApiError = require("../error/ApiError");
const { User } = require("../models");
const mongoClient = require("../mongo")
const requests = mongoClient.db('Messenger').collection('userRequests');


async function updateUserActivity(userId) {
    await requests.updateOne(
        { _id: userId },
        {
            $set: { lastRequestTime: Date.now() }
        })

    const user = await User.findByPk(userId)
    await user.update({ isActive: true })
}

module.exports = async function (req, res, next) {
    try {
        await updateUserActivity(req.user.id)
        next()
    } catch (e) {
        return ApiError.Internal('Something went wrong with active status setting')
    }
}