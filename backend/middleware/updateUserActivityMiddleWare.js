const ApiError = require("../error/ApiError")
const mongoClient = require("../mongo")
const requests = mongoClient.db('Messenger').collection('userRequests');


async function updateUserActivity(userId) {
    await requests.updateOne(
        { _id: userId },
        {
            $set: { lastRequestTime: Date.now() }
        })

}
module.exports = async function (req) {
    try {
        const userId = req.user.id
        
        updateUserActivity(userId)

        next()
    } catch (e) {
        return ApiError.Internal('Something went wrong with active status setting')
    }
}