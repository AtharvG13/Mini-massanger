import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  getUserProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  signupUserThunk,
} from "./user.Thunk.js";

const initialState = {
  isAuthenticated: false,
  screenLoading: true,
  otherUsers: [],
  userProfile: null,
  buttonLoading: false,
  error: null,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser(state, action) {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      state.isAuthenticated = true;
      state.userProfile = action.payload?.user;

      if (action.payload?.token) {
        localStorage.setItem("authToken", action.payload.token);
      }
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // signup user
    builder.addCase(signupUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });

    builder.addCase(signupUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      state.isAuthenticated = true;
      state.userProfile = action.payload?.user;

      // ADD THIS LINE - store token just like in login
      if (action.payload?.token) {
        localStorage.setItem("authToken", action.payload.token);
      }
    });
    builder.addCase(signupUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // logout
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });

    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.userProfile = null;
      state.selectedUser = null;
      state.otherUsers = [];
      state.isAuthenticated = false;
      state.buttonLoading = false;
      state.screenLoading = false;
      localStorage.removeItem("authToken");
      localStorage.clear();
    });

    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // get-user-profile
    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.userProfile = action.payload?.responseData;
    });
    builder.addCase(getUserProfileThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    // get-other-users
    builder.addCase(getOtherUsersThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.responseData;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state) => {
      state.screenLoading = false;
    });
  },
});

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
