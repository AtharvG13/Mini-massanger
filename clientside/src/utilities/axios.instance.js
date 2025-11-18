import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";
console.log("Base URL (hardcoded):", BASE_URL);

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
