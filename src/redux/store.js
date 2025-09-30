import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { bookingsReducer } from "./booking/slice";
import { reservationReducer } from "./reserv/slice";
import { reservationDodatekReducer } from "./reservDodatek/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    bookings: bookingsReducer,
    reservation: reservationReducer,
    reservationDodatek: reservationDodatekReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
