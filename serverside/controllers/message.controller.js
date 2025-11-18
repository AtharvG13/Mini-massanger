import express from "express";
import Message from "../models/messageSchema.model.js";
import Conversation from "../models/conversation.schema.js";
import errorHandler from "../middleware/errors.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;
    const message = req.body.message;

    if (!senderId || !receiverId || !message) {
      return next(new errorHandler("Please fill all the fields", 400));
    }

    let conversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participant: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    // Socket.io implementation

    res.status(200).json({
      success: true,
      responseData: newMessage,
      message: "Message sent successfully",
    });
  } catch (error) {
    next(error);
  }
});

export const getMessages = catchAsyncError(async (req, res, next) => {
  try {
    const myId = req.user._id;
    const otherParticipantsId = req.params.otherParticipantsId;

    if (!myId || !otherParticipantsId) {
      return next(new errorHandler("Please fill all the fields", 400));
    }

    let conversation = await Conversation.findOne({
      participant: { $all: [myId, otherParticipantsId] },
    }).populate("messages");

    res.status(200).json({ success: true, responseData: conversation });
  } catch (error) {
    next(error);
  }
});
