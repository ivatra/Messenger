const e = require("express")
const userQueries = require("../database/postqre/queries/userQueries")
const fileService = require("../service/fileService")

module.exports = async function (req, res, next) {
    const { name, email,login, password } = req.body
    var avatar

    if (req.files)
        avatar = req.files.avatar

    if (!email || !password)
        return res.status(400).json({ message: "Incorrect email or password" })

    if (email && password && !name)
        return res.status(400).json({ message: 'Enter your name, please' })

    const candidateByEmail = await userQueries.receiveUserByEmail(email)

    if (candidateByEmail)
        return res.status(400).json({ message: 'User with this email arleady exists' })

    const candidateByLogin = await userQueries.receiveUserByLogin(login)

    if (candidateByLogin)
        return res.status(400).json({ message: 'User with this login arleady exists' })

    if (avatar) {
        await fileService.checkForImage(avatar.name)
        req.avatar = await fileService.saveFile(avatar, avatar.name, 'userAvatars')
    }
    else
        req.avatar = 'defaultPic.jpg';

    next()
}