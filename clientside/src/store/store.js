import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/User/user.slice.js";
import messageReducer from "./slice/Message/message.slice.js";
import socketReducer from "./slice/Socket/socket.slice.js";

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }),
});
