const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userQueries = require("../database/postqre/queries/userQueries")


function generateJwt(id, name, email) {
    return jwt.sign({
        id,
        name,
        email
    },
        process.env.SECRET_KEY,
        { expiresIn: '7d' })

}

class authService {
    checkIsPasswordCorrect(rightPassword, usersPassword) {
        let comparePassword = bcrypt.compareSync(usersPassword, rightPassword)
        if (!comparePassword)
            throw ApiError.Internal('Incorrent password')
    }

    async login(email, password) {
        const user = await userQueries.receiveUserByEmail(email)
        if (!user)
            throw ApiError.Internal('User not found')

        this.checkIsPasswordCorrect(user.password, password)

        return generateJwt(user.id, user.email, user.role)
    }

    async register(login,email,password,name,avatar) {
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await userQueries.create(login,email,hashPassword,name,avatar)

        return generateJwt(user.id, user.login, user.email)
    }
    
    async check() {

    }
}

module.exports = new authService()