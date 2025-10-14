import express, { response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import errorHandler from "../middleware/errors.js";
import { errorMiddleware } from "../middleware/errors.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
  try {
    const { fullname, username, password, gender } = req.body;
    if (!fullname || !username || !password || !gender) {
      return next(new errorHandler("Please fill all the fields", 400));
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return next(new errorHandler("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      username,
      password: hashedPassword,
      gender,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      responseData: { user },
    });
  } catch (error) {
    next(error);
  }
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new errorHandler("Please fill All the fields!!", 400));
    }

    const user = await User.findOne({ username });

    if (!user) {
      return next(new errorHandler("User not found", 404));
    }

    if (user.password !== password) {
      return next(new errorHandler("Invalid password", 401));
    }

    res.status(200).json({ status: true, message: "Login successful" });
  } catch (error) {
    next(error);
  }
});
