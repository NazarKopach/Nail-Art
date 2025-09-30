import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const reservationDodatekSlice = createSlice({
  name: "reservationDodatek",
  initialState,
  reducers: {
    setReservationDodatek: (state, action) => {
      const exists = state.some(
        (item) => item.idDodatek === action.payload.idDodatek
      );

      if (exists) return;

      state.push({
        idDodatek: action.payload.idDodatek,
        servicesDodatek: action.payload.servicesDodatek,
        priceDodatek: action.payload.priceDodatek,
        srcDodatek: action.payload.srcDodatek,
      });
    },
    clearReservationDodatek: (state, action) => {
      return state.filter((item) => item.idDodatek !== action.payload);
    },
  },
});

export const { setReservationDodatek, clearReservationDodatek } =
  reservationDodatekSlice.actions;
export const reservationDodatekReducer = reservationDodatekSlice.reducer;
