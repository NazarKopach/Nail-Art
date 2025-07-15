import { createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../auth/operations";

export const addBookings = createAsyncThunk(
  "bookings/addBookings",
  async (bookingData, thunkApi) => {
    try {
      const respons = await authInstance.post("/bookings", bookingData);
      return respons.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  "bookings/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await authInstance.get("/bookings");

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
