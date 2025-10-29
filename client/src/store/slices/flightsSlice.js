// src/store/slices/flightsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFlightsApi } from '../../api/flightsApi';

export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchFlightsApi(params); 
      return data; 
    } catch (error) {
      console.error("Error in fetchFlights thunk:", error);
      return rejectWithValue(error.message || 'Failed to fetch flights');
    }
  }
);

const initialState = {
  results: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    sortBy: 'best', // 'best' | 'cheapest' | 'fastest' | 'earliest'
    maxPrice: 10000,
    stops: [], // ['nonstop', '1stop', '2+stops']
    airlines: [],
  },
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
    },
    toggleStopFilter: (state, action) => {
      const stop = action.payload;
      const index = state.filters.stops.indexOf(stop);
      if (index > -1) {
        state.filters.stops.splice(index, 1);
      } else {
        state.filters.stops.push(stop);
      }
    },
    toggleAirlineFilter: (state, action) => {
      const airline = action.payload;
      const index = state.filters.airlines.indexOf(airline);
      if (index > -1) {
        state.filters.airlines.splice(index, 1);
      } else {
        state.filters.airlines.push(airline);
      }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearFlights: (state) => {
      state.results = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
        state.error = null;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Error message from rejectWithValue
        state.results = []; // Clear results on failure
      });
  },
});

export const {
  setSortBy,
  setMaxPrice,
  toggleStopFilter,
  toggleAirlineFilter,
  clearFilters,
  clearFlights,
} = flightsSlice.actions;

export default flightsSlice.reducer;

export const selectFlights = (state) => state.flights.results;
export const selectFlightsStatus = (state) => state.flights.status;
export const selectFlightsError = (state) => state.flights.error;
export const selectFilters = (state) => state.flights.filters;

export const selectFilteredSortedFlights = (state) => {
  const { results, filters } = state.flights;
  let filtered = [...results]; // Create a copy

  // Apply filters (example for stops)
  if (filters.stops.length > 0) {
    filtered = filtered.filter(flight => {
      const stopKey = flight.stops.toLowerCase().replace(' ', '');
      return filters.stops.includes(stopKey);
    });
  }
  // Add other filters (price, airlines) here...
  if (filters.maxPrice) {
    filtered = filtered.filter(flight => flight.price <= filters.maxPrice);
  }
  if (filters.airlines.length > 0) {
    filtered = filtered.filter(flight => filters.airlines.includes(flight.airline));
  }
  

  // Apply sorting
  switch (filters.sortBy) {
    case 'cheapest':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'fastest':
      // Requires converting duration string to minutes/seconds
      filtered.sort((a, b) => {
        const durationA = (a.duration.hours * 60) + a.duration.minutes;
        const durationB = (b.duration.hours * 60) + b.duration.minutes;
        return durationA - durationB;
      });
      break;
    // Add 'earliest' sorting based on departure time...
    case 'best': // Keep original order or add complex logic
    default:
      break;
  }

  return filtered;
};