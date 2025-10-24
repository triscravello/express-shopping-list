/** Custom Error class */
class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

/** 404 NOT FOUND error handler */
function notFoundErrorHandler(req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
}

/** Generic error handler */
function handleErrors(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    return res.status(status).json({ error: message });
}

module.exports = {
    ExpressError,
    notFoundErrorHandler,
    handleErrors
};