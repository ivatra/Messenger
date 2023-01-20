const userQueries = require("../database/postqre/queries/userQueries");

module.exports = async function (req, res, next) {
    try {
        await userQueries.updateUserActivity(req.user.id,true)
        next()
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong with active status setting' })
    }
}