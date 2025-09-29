import mongoose from "mongoose";

const connection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log("Database connection failed");
    });
};

export default connection;
