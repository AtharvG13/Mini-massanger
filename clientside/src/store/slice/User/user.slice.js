import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./user.Thunk.js";

const initialState = {
  isAuthenticated: false,
  screenLoading: false,
  userProfile: null,
  buttonLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.userProfile = action.payload?.responseData?.user;
      console.log(action.payload);
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });
  },
});

export default userSlice.reducer;
