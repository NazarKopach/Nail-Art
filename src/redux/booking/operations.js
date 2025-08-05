import { createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../auth/operations";

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

export const deleteContact = createAsyncThunk(
  "bookings/deleteBookings",
  async (contactId, thunkApi) => {
    try {
      await authInstance.delete(`/bookings/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
