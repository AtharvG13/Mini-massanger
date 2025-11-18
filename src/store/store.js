import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/User/user.slice.js";

export const store = configureStore({
  reducer: {
    userReducer,
  },
});
