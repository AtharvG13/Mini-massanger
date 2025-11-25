import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/User/user.slice.js";
import messageReducer from "./slice/Message/message.slice.js";

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
  },
});
