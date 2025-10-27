import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  getOthersProfile,
} from "../controllers/user.controllers.js";
import { IsAuthenticated } from "../middleware/userIsAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", IsAuthenticated, getUser);

router.post("/logout", IsAuthenticated, logoutUser);

router.get("/get-others-profile", IsAuthenticated, getOthersProfile);

export default router;
