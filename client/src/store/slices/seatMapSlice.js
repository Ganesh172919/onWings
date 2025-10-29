// src/store/slices/seatMapSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSeatMapApi } from '../../api/seatMapApi';

export const fetchSeatMap = createAsyncThunk(
  'seatMap/fetchSeatMap',
  async (flightId, { rejectWithValue }) => {
    if (!flightId) {
        return rejectWithValue('Flight ID is required to fetch seat map.');
    }
    try {
      const data = await fetchSeatMapApi(flightId); 
      return data; // Expects { flightId, layout, metadata }
    } catch (error) {
      console.error("Error in fetchSeatMap thunk:", error); 
      return rejectWithValue(error.message || 'Failed to fetch seat map');
    }
  }
);

const initialState = {
  layout: [], // Array of seat objects with row, column, status, price
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  flightId: null,
  metadata: {
    totalSeats: 0,
    availableSeats: 0,
    premiumSeats: 0,
    economySeats: 0,
  },
};

const seatMapSlice = createSlice({
  name: 'seatMap',
  initialState,
  reducers: {
    // updateSeatStatus might be handled by bookingSlice now, or kept for local UI changes
    // If kept, ensure it correctly finds and updates the seat in state.layout
    updateSeatStatusLocally: (state, action) => {
      const { seatId, status } = action.payload;
      const seatIndex = state.layout.findIndex(s => s.id === seatId);
      if (seatIndex !== -1) {
        state.layout[seatIndex].status = status;
      }
    },
    clearSeatMap: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeatMap.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        // Optionally clear previous layout while loading new one
        // state.layout = []; 
        // state.flightId = null;
      })
      .addCase(fetchSeatMap.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.layout = action.payload.layout || []; 
        state.flightId = action.payload.flightId;
        state.metadata = action.payload.metadata || initialState.metadata;
        state.error = null;
      })
      .addCase(fetchSeatMap.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Error message from rejectWithValue
        state.layout = [];
        state.flightId = null;
      });
  },
});

export const { updateSeatStatusLocally, clearSeatMap } = seatMapSlice.actions;

export default seatMapSlice.reducer;

export const selectSeatLayout = (state) => state.seatMap.layout;
export const selectSeatMapStatus = (state) => state.seatMap.status;
export const selectSeatMapError = (state) => state.seatMap.error;
export const selectSeatMapMetadata = (state) => state.seatMap.metadata;
export const selectSeatMapFlightId = (state) => state.seatMap.flightId;

// Selector to find a specific seat's details (useful for price calculation)
export const selectSeatById = (seatId) => (state) => {
  return state.seatMap.layout.find(seat => seat.id === seatId);
};