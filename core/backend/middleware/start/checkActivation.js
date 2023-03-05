const userQueries = require('../../database/postqre/queries/userQueries')

module.exports = async function (req, res, next) {
    try {
        const candidate = await userQueries.receiveUserServiceInfoById(req.user.id)

        if (!candidate.isActivated)
            return res.status(403).json({ message: "Activate your account by e-mail!" })

        next()

    } catch (e) {
        return res.status(403).json({ message: "Activate your account by e-mail!" })
    }
}