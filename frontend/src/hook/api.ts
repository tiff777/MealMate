import axios from "axios";
import type { AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api",
});

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api",
});

authClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Sending request with headers:", config.headers);
  return config;
});
