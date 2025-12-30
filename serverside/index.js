import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { server, app } from "./Socket/socket.js";
import router from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import connection from "./dbconnection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/errors.js";

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

connection();

app.use("/api/v1/user", router);

app.use("/api/v1/message", messageRouter);

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
