import express from "express";
import Message from "../models/messageSchema.model.js";
import Conversation from "../models/conversation.schema.js";
import errorHandler from "../middleware/errors.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { getSocketId, io } from "../Socket/socket.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("All fields are required", 400));
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

  conversation.messages.push(newMessage._id);
  await conversation.save();

  // ✅ CORRECT SOCKET EMIT
  const receiverSocketId = getSocketId(String(receiverId));
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("receiveMessage", newMessage);
  }

  res.status(200).json({
    success: true,
    responseData: newMessage,
  });
});

export const getMessages = catchAsyncError(async (req, res, next) => {
  const myId = req.user._id;
  const otherParticipantsId = req.params.otherParticipantsId;

  if (!myId || !otherParticipantsId) {
    return next(new errorHandler("All fields are required", 400));
  }

  let conversation = await Conversation.findOne({
    participant: { $all: [myId, otherParticipantsId] },
  }).populate("messages");

  res.status(200).json({
    success: true,
    responseData: conversation,
  });
});
