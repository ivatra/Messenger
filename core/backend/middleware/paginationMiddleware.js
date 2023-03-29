module.exports = function (req, res, next) {
    var { limit, offset } = req.query;
    req.limit = limit || 20;
    req.offset = offset || 0
    next();
};
