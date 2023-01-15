const { Sequelize } = require("../db");
const ApiError = require("../error/ApiError");
const { User } = require("../models");

async function updateUserActivity(userId) {
    User.update({
        lastSeen: Sequelize.literal('CURRENT_TIMESTAMP'),
        isActive: true
    }, {
        where: {
            id: userId
        }
    })
}

module.exports = async function (req, res, next) {
    try {
        await updateUserActivity(req.user.id)
        next()
    } catch (e) {
        return ApiError.Internal('Something went wrong with active status setting')
    }
}