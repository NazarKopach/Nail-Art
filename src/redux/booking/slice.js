import { createSlice } from "@reduxjs/toolkit";
import { addBookings, fetchBookings } from "./operations";

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings.push(action.payload);
      })
      .addCase(addBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const bookingsReducer = bookingsSlice.reducer;
