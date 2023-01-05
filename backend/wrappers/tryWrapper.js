const ApiError = require("../error/ApiError");

function wrapTry(fn) {
    return async function (req, res, next) {
      await fn(req, res, next).catch( e => next(ApiError.badRequest(e.message)));
    };
  }

module.exports = wrapTry