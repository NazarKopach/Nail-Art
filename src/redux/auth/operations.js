import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authInstance = axios.create({
  baseURL: "https://nail-art-backend-0ip3.onrender.com",
  withCredentials: true,
});

export const setToken = (token) => {
  localStorage.setItem("accessToken", token);
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  localStorage.removeItem("accessToken");
  delete authInstance.defaults.headers.common.Authorization;
};

export const apiRegisterUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const { data } = await authInstance.post("/auth/register", userData);
      const token = data.data.accessToken;

      setToken(token);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const apiLoginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const { data } = await authInstance.post("/auth/login", userData);
      const token = data.data.accessToken;

      setToken(token);

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const apiGetCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const { data } = await authInstance.post("/auth/refresh");

      setToken(data.data.accessToken);

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const apiGetCurrentUserInfo = createAsyncThunk(
  "auth/user-info",
  async (_, thunkApi) => {
    try {
      const { data } = await authInstance.get("/auth/user");

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const apiLogoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const { data } = await authInstance.post("/auth/logout");

      clearToken();

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
