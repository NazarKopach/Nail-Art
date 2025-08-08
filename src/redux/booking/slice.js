import { createSlice } from "@reduxjs/toolkit";
import {
  addBookings,
  deleteContact,
  fetchAllBookings,
  fetchReservedBookings,
  fetchUserBookings,
} from "./operations";

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookingsAll: [],
    bookings: [],
    reservation: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingsAll = action.payload.bookings;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload.bookings;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchReservedBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReservedBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservation = action.payload.reservation;
      })
      .addCase(fetchReservedBookings.rejected, (state, action) => {
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
