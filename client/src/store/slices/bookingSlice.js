// src/store/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBooking } from '../../api/bookingsApi.js';

export const confirmBooking = createAsyncThunk(
  'booking/confirmBooking',
  async (_, { getState, rejectWithValue }) => {
    const { booking } = getState();

    const bookingData = {
      flight: booking.selectedFlight,
      passengers: booking.passengers,
      seats: booking.selectedSeats,
      fareBundle: booking.selectedFareBundle,
      contactInfo: {
        email: booking.passengers[0]?.email || 'test@example.com',
        phone: '123-456-7890' // Example
      },
    };

    try {
      const confirmation = await createBooking(bookingData);
      if (confirmation.success) {
        return { bookingReference: confirmation.bookingReference };
      } else {
        return rejectWithValue(confirmation.message || 'Booking failed');
      }
    } catch (error) {
      console.error("Error in confirmBooking thunk:", error);
      return rejectWithValue(error.message || 'Failed to confirm booking');
    }
  }
);


const initialState = {
  step: 1,
  searchParams: null,
  selectedFlight: null,
  passengers: [], // Passengers array
  selectedFareBundle: null,
  selectedSeats: [], // Should store { id: string, price: number }
  bookingReference: null,
  totalPrice: 0, // Should probably represent the final calculated total
  confirmationStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  confirmationError: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setStep: (state, action) => { state.step = action.payload; },
    setSearchParams: (state, action) => { state.searchParams = action.payload; },
    setSelectedFlight: (state, action) => { state.selectedFlight = action.payload; },
    addPassenger: (state, action) => { state.passengers.push(action.payload); },
    updatePassenger: (state, action) => {
       const { index, data } = action.payload;
       if (state.passengers[index]) {
            state.passengers[index] = { ...state.passengers[index], ...data };
       }
     },
    removePassenger: (state, action) => {
        const indexToRemove = action.payload;
        if (indexToRemove >= 0 && indexToRemove < state.passengers.length) {
            state.passengers.splice(indexToRemove, 1);
        }
     },
    clearPassengers: (state) => {
      state.passengers = []; // Reset the passengers array
    },
    selectFareBundle: (state, action) => { state.selectedFareBundle = action.payload; },
    toggleSeat: (state, action) => {
      const seat = action.payload; // Expects { id: '12A', price: 45 }
      const existsIndex = state.selectedSeats.findIndex(s => s.id === seat.id);
      if (existsIndex > -1) {
        state.selectedSeats.splice(existsIndex, 1); 
      } else {
         // Add validation based on passenger count if needed here
         // if (state.selectedSeats.length < state.passengers.length) {
              state.selectedSeats.push(seat); // Add if doesn't exist
         // }
      }
    },
    clearSeats: (state) => { state.selectedSeats = []; },
    setBookingReference: (state, action) => { state.bookingReference = action.payload; },
    setTotalPrice: (state, action) => {
        // This currently sets only the seat price total based on SeatSelection page.
        // Consider recalculating the full total (base + seats + taxes) here or in Review page.
        state.totalPrice = action.payload;
     },
    resetBooking: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmBooking.pending, (state) => {
        state.confirmationStatus = 'loading';
        state.confirmationError = null;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.confirmationStatus = 'succeeded';
        state.bookingReference = action.payload.bookingReference;
        state.step = 6; 
        state.confirmationError = null;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.confirmationStatus = 'failed';
        state.confirmationError = action.payload; 
      });
  },
});

export const {
  setStep,
  setSearchParams,
  setSelectedFlight,
  addPassenger,
  updatePassenger,
  removePassenger,
  clearPassengers,
  selectFareBundle,
  toggleSeat,
  clearSeats,
  setBookingReference,
  setTotalPrice,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;

export const selectBookingStep = (state) => state.booking.step;
export const selectSearchParams = (state) => state.booking.searchParams;
export const selectSelectedFlight = (state) => state.booking.selectedFlight;
export const selectPassengers = (state) => state.booking.passengers;
export const selectSelectedFareBundle = (state) => state.booking.selectedFareBundle;
export const selectSelectedSeats = (state) => state.booking.selectedSeats;
export const selectTotalPrice = (state) => state.booking.totalPrice; // Review: Is this just seat total or final total?
export const selectBookingReference = (state) => state.booking.bookingReference;
export const selectConfirmationStatus = (state) => state.booking.confirmationStatus;
export const selectConfirmationError = (state) => state.booking.confirmationError;