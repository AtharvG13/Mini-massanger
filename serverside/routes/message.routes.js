import express from "express";
import { IsAuthenticated } from "../middleware/userIsAuthenticated.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", IsAuthenticated, sendMessage);

messageRouter.get(
  "/get-messages/:otherParticipantsId",
  IsAuthenticated,
  getMessages
);

export default messageRouter;
