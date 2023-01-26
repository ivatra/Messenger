class ApiError extends Error{
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(400,message)
    }

    static Internal(message) {
        return new ApiError(500,message)
    }

    static forbidden(message) {
        return new ApiError(403,message)
    }
    
    static tooManyRequests(message) {
        return new ApiError(429,message)
    }
}

module.exports = ApiError