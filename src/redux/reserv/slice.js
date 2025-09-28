import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: "",
  price: null,
  src: "",
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservation: (state, action) => {
      state.services = action.payload.services;
      state.price = action.payload.price;
      state.src = action.payload.src;
    },
    clearReservation: (state) => {
      state.services = "";
      state.price = null;
      state.src = "";
    },
  },
});

export const { setReservation, clearReservation } = reservationSlice.actions;
export const reservationReducer = reservationSlice.reducer;
