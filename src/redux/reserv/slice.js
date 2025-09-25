import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: "",
  price: null,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservation: (state, action) => {
      state.services = action.payload.services;
      state.price = action.payload.price;
    },
    clearReservation: (state) => {
      state.services = "";
      state.price = null;
    },
  },
});

export const { setReservation, clearReservation } = reservationSlice.actions;
export const reservationReducer = reservationSlice.reducer;
