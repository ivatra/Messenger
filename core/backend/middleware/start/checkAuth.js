const tokenService = require('../../service/auth/tokenService')

module.exports = async function(req,res,next){
    if (req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        req.user = tokenService.verifyJwtToken(token)

        next()

    }catch(e){
        return res.status(401).json({ message: "The user is not logged in" })
    }
}