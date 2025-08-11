import { createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../auth/operations";

export const fetchAllBookings = createAsyncThunk(
  "bookings/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await authInstance.get("/bookings/");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchAllUser",
  async (_, thunkApi) => {
    try {
      const response = await authInstance.get("/bookings/user-by-id");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchReservedBookings = createAsyncThunk(
  "bookings/fetchReservation",
  async (_, thunkApi) => {
    try {
      const response = await authInstance.get("/bookings/get-reservation");
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
      const response = await authInstance.post("/bookings", bookingData);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBookings",
  async (bookingId, thunkApi) => {
    try {
      await authInstance.delete(`/bookings/${bookingId}`);
      return bookingId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const patchBooking = createAsyncThunk(
  "bookings/patchBooking",
  async ({ id, partialData }, thunkApi) => {
    try {
      const response = await authInstance.patch(`/bookings/${id}`, partialData);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
