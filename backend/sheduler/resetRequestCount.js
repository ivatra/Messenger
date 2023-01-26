const userQueries = require('../database/postqre/queries/userQueries');

const resetRequestCount = async () => {
    await userQueries.resetUsersRequestsCount()
}

module.exports = resetRequestCount