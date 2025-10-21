import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import errorHandler from "./errors.js";
import catchAsyncError from "./catchAsyncError.js";

export const IsAuthenticated = catchAsyncError(async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return next(
        new errorHandler("Please login to access this resource", 401)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded?._id);
    next();
  } catch (error) {
    next(error);
  }
});
