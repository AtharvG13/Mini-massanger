import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utilities/axios.instance";
import { toast } from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
  "user/fetchById",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      toast.success("User logged in successfully!!");
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
