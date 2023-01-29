const activationQueries = require("../database/mongo/queries/activationQueries")

module.exports = async function (req, res, next) {
    const { link } = req.params

    const activation = await activationQueries.receiveLink(link)

    if (!activation)
        return res.status(400).json({ message: "Link is not valid. Go back to the site and request a new link. " })

    if (activation.expired)
        return res.status(400).json({ message: "Link is expired. Go back to the site and request a new link. " })

    req.userId = activation.userId

    next()
}