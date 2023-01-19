const userQueries = require("../database/postqre/queries/userQueries")

module.exports = async function (req, res, next) {
    try {
        const { name, avatar, email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ message: "Incorrect email or password" })

        if (email && password && !name)
            return res.status(400).json({ message: 'Enter your name, please' })

        const candidate = await userQueries.receiveUserByEmail(email)

        if (candidate)
            return res.status(400).json({ message: 'User with this email arleady exists' })

        req.body.avatar = avatar || 'defaultPic.jpg';

        next()

    } catch (e) {
        return res.status(400).json({ message: 'Something went wrong with registration' })
    }
}