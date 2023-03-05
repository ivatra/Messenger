module.exports = function (req, res, next) {
    var { limit, page } = req.body
    page = page || 1;
    req.limit = limit || 20;
    req.offset = page * req.limit - req.limit
    next()
}