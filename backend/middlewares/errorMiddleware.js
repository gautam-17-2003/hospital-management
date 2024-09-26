class Errorhandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered!`
        err = Errorhandler(message, 400);
    }

    if (err.name === "JsonWebTokenError") {
        const message = "Json web token is invalid! try again"
        err = Errorhandler(message, 400);
    }

    if (err.name === "TokenExpiedError") {
        const message = "Token Expired!!"
        err = Errorhandler(message, 400);
    }

    if (err.name === "CastError") {
        const message = `Invaid ${err.path}`
        err = Errorhandler(message, 400);
    }

    const errMessage = err.errors ? Object.values(err.errors).map((error) => error.message).join(" ") : err.message;


    return res.status(err.statusCode).json({
        success: false,
        message: errMessage
    });

}

export default Errorhandler;