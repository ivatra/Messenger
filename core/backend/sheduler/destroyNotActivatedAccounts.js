const tokensQueries = require("../database/mongo/queries/tokensQueries")
const userQueries = require("../database/postqre/queries/userQueries")


async function destroyNotActivatedAccounts() {
    const notActivatedUsers = await userQueries.receiveNotActivatedUsers()
    notActivatedUsers.map(async (notActivatedUser) => {
        await userQueries.destroyUser(notActivatedUser)
        await tokensQueries.expireRefreshTokensByUser(notActivatedUser.id)
    })
}


module.exports = destroyNotActivatedAccounts