import { createSlice } from "@reduxjs/toolkit";
import { addBookings, deleteContact, fetchBookings } from "./operations";

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
        state.bookings = action.payload.bookings;
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
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload
        );
      }),
});

export const bookingsReducer = bookingsSlice.reducer;
