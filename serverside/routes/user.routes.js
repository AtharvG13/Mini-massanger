import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/user.controllers.js";
import { IsAuthenticated } from "../middleware/userIsAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", IsAuthenticated, getUser);

export default router;
