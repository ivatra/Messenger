const ApiError = require("../error/ApiError")
const { User } = require("../models/userModel")

module.exports = async function (req, res, next) {
    try {
        const { name, avatar, email, password } = req.body
        if (!email || !password)
            throw ApiError.badRequest('Incorrect email or password')

        if (email && password && !name)
            throw ApiError.badRequest('Enter your name, please')

        const candidate = await User.findOne({ where: { email } })

        if (candidate)
            throw ApiError.badRequest('User with this email arleady exists')

        req.avatar = avatar || 'defaultPic.jpg';

        next()

    } catch (e) {
        return ApiError.Internal('Something went wrong with registration.')
    }
}