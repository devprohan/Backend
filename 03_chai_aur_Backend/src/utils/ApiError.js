// This defines a custom error class called ApiError that inherits from the built-in JavaScript Error class.
class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something Went Wrong", // it default Something Went Wrong
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}