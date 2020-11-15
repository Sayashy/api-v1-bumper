exports.RequiredParameterError = class RequiredParameterError extends Error {
    constructor(param) {
        super(`'${param}' cannot be null or undefined`)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RequiredParameterError)
        }
    }
}

exports.InvalidProprityError = class InvalidProprityError extends Error {
    constructor(param) {
        super(param)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidProprityError)
        }
    }
}