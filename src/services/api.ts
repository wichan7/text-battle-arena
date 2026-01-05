import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

const api = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    if (error.response?.data?.code === 401 || error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }

    return Promise.reject(error);
  },
);

export default api;
