// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './slices/bookingSlice';
import flightsReducer from './slices/flightsSlice';
import seatMapReducer from './slices/seatMapSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    flights: flightsReducer,
    seatMap: seatMapReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['booking/setSearchParams'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.date'],
        // Ignore these paths in the state
        ignoredPaths: ['booking.searchParams.date'],
      },
    }),
});