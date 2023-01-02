const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User} = require('../models/userModel')

const generateJwt = (id,name,email) => {
    return jwt.sign({
        id,
        name,
        email
    },
        process.env.SECRET_KEY,
        {expiresIn:'24h'})

}

class AuthController {
    async registration(req, res,next) {
        const { name,avatar,email,password } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }

        if (email && password && !name) {
            return next(ApiError.badRequest('Enter your name, please'))
        }

        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('User with this email arleady exists'))
        }

        const hashPassword = await bcrypt.hash(password, 5)

        if (!avatar) {
            const avatar = 'defaultPic.jpg'
        }
        const user = await User.create({ name,avatar,email,password: hashPassword })
        const token = generateJwt(user.id,user.name,user.email)
        return res.json({token})
    }

    async login(req, res,next) {
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.Internal('User not found'))
        }

        let comparePassword = bcrypt.compareSync(password,user.password)

        if (!comparePassword){
            return next(ApiError.Internal('Incorrent password'))
        }
        const token = generateJwt(user.id,user.email,user.role)
        return res.json({token})

        }

    async check(req, res, next) {
        res.json({message:'everytihng works'})
    }
}

module.exports = new AuthController()