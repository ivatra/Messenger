const { User } = require("../models/userModel")
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoClient = require('../mongo')

class authService {
    generateJwt(id, name, email) {
        return jwt.sign({
            id,
            name,
            email
        },
            process.env.SECRET_KEY,
            { expiresIn: '24h' })

    }

    getUserActivityRecord(userId) {
        return {
            _id: userId,
            isActive: true
        }
    }

    checkIsPasswordCorrect(rightPassword, usersPassword) {
        let comparePassword = bcrypt.compareSync(usersPassword, rightPassword)
        if (!comparePassword)
            throw ApiError.Internal('Incorrent password')
    }

    async createUserActivityRecord(userId) {
        const requests = mongoClient.db('Messenger').collection('userRequests');
        const record = this.getUserActivityRecord(userId)
        await requests.insertOne(record)
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })
        if (!user)
            throw ApiError.Internal('User not found')

        this.checkIsPasswordCorrect(user.password, password)

        return this.generateJwt(user.id, user.email, user.role)
    }

    async register(name, avatar, email, password) {
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({ name, avatar, email, password: hashPassword })

        await this.createUserActivityRecord(user.id)

        return generateJwt(user.id, user.name, user.email)
    }
    
    async check() {

    }
}

module.exports = new authService()