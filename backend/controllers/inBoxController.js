

class inboxController{
    async getAll(req, res,next) {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const email

    }
}