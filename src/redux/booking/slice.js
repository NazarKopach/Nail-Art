import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "./operations";

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const bookingsReducer = bookingsSlice.reducer;
