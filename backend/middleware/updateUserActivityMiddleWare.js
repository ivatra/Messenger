const userQueries = require("../database/postqre/queries/userQueries");

async function updateUserActivity(userId) {
    userQueries.updateUserActivity(userId)
}

module.exports = async function (req, res, next) {
    try {
        await updateUserActivity(req.user.id)
        next()
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong with active status setting' })
    }
}