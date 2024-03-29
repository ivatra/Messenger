const userQueries = require("../../database/postqre/queries/userQueries")

module.exports = async function (req, res, next) {
    try {
        const user = await userQueries.receiveUserServiceInfoById(req.user.id)
        if (user.requestsCountPerMinute > 3)
            return res.status(429).json({message:'Too many requests'})

        await userQueries.incrementUserRequestCount(req.user.id)

        next()

    } catch (e){
        console.log(e)
        return res.status(500).json({message:'Something went wrong with checking requests'})
    }
}