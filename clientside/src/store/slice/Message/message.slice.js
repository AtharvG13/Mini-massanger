import { createSlice } from "@reduxjs/toolkit";
import { sendMessageThunk, getMessageThunk } from "./message.Thunk.js";

const initialState = {
  buttonLoading: false,
  messages: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // send message
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.messages = [
        ...state.messages,
        action.payload?.responseData?.messages,
      ];
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // get message
    builder.addCase(getMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;

      state.messages = action.payload?.responseData?.messages;
    });
    builder.addCase(getMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });
  },
});

export default messageSlice.reducer;
