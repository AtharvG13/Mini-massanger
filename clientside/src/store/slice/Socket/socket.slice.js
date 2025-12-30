import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { setNewMessage } from "../Message/message.slice";

let socketInstance = null;

const initialState = {
  onlineUsers: [],
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocketConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload.map(String);
    },
  },
});

export const { setOnlineUsers, setSocketConnected } = socketSlice.actions;

export const initializeSocket = (userId) => (dispatch) => {
  if (!userId || socketInstance) return;

  const SOCKET_URL = import.meta.env.VITE_APP_SOCKET_URL;

  socketInstance = io(SOCKET_URL, {
    query: { userId: String(userId) },
    transports: ["websocket", "polling"],
    withCredentials: true,
  });

  socketInstance.on("connect", () => {
    dispatch(setSocketConnected(true));
  });

  socketInstance.on("onlineUsers", (users) => {
    dispatch(setOnlineUsers(users));
  });

  socketInstance.on("receiveMessage", (message) => {
    dispatch(setNewMessage(message));
  });

  socketInstance.on("disconnect", () => {
    dispatch(setSocketConnected(false));
  });
};

export const getSocket = () => socketInstance;

export const closeSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};

export default socketSlice.reducer;
