import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/User/user.slice.js";

export const store = configureStore({
  reducer: { userReducer: userSlice },
});
