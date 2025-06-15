import { createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../auth/operations";

export const fetchBooks = createAsyncThunk(
  "bookings/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await authInstance.get("/auth/bookings");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
