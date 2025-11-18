class errorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Invalid ID ${err.path}`;
    err = new errorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `jason web token is invalid, please login again`;
    err = new errorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `jason web token has expired, please login again`;
    err = new errorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `duplicate value entered for ${Object.keys(err.keyValue)}`;
    err = new errorHandler(message, 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
