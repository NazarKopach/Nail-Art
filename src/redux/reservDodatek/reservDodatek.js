import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const reservationDodatekSlice = createSlice({
  name: "reservationDodatek",
  initialState,
  reducers: {
    setReservationDodatek: (state, action) => {
      state.push({
        servicesDodatek: action.payload.servicesDodatek,
        priceDodatek: action.payload.priceDodatek,
        srcDodatek: action.payload.srcDodatek,
      });
    },
    clearReservationDodatek: () => {
      return [];
    },
  },
});

export const { setReservationDodatek, clearReservationDodatek } =
  reservationDodatekSlice.actions;
export const reservationDodatekReducer = reservationDodatekSlice.reducer;
