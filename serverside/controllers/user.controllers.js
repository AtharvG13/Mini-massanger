import express, { response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import errorHandler from "../middleware/errors.js";
import jwt from "jsonwebtoken";
import { sendToken } from "../utilities/sendToken.js";
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

    const avatarType = gender === "male" ? "7" : "98";
    const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

    const user = await User.create({
      fullname,
      username,
      password: hashedPassword,
      gender,
      avatar,
    });

    sendToken(user, 201, "User registered successfully", res);
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
      return next(new errorHandler("User not found!!!", 404));
    }

    const userIsValid = await bcrypt.compare(password, user.password);
    if (!userIsValid) {
      return next(new errorHandler("Enter valid username or password", 400));
    }

    sendToken(user, 200, "User logged in successfully", res);
  } catch (error) {
    next(error);
  }
});

export const getUser = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const profile = await User.findById(userId);
    res.status(200).json({ success: true, responseData: profile });
  } catch (error) {
    next(error);
  }
});
