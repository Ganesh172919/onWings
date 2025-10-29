// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserBookings } from '../../api/bookingsApi.js';

export const fetchBookings = createAsyncThunk(
  'user/fetchBookings',
  async (userId, { rejectWithValue }) => {
    if (!userId) userId = 'mockUser123'; // Use placeholder if ID not provided

    try {
      // *** UPDATED: Call fetchUserBookings directly ***
      const data = await fetchUserBookings(userId);
      // Combine upcoming and past into a single history array
      return [...(data.upcoming || []), ...(data.past || [])];
    } catch (error) {
      console.error("Error in fetchBookings thunk:", error);
      return rejectWithValue(error.message || 'Failed to fetch bookings');
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null, // Should contain user details including id
  preferences: {
    theme: 'dark',
    currency: 'USD',
    notifications: true,
  },
  loyaltyPoints: 0,
  bookingHistory: [], // Will store fetched bookings
  bookingsStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  bookingsError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // Ensure payload includes user ID like { id: '...', firstName: '...', ... }
      // Reset booking status on login if needed
      state.bookingHistory = [];
      state.bookingsStatus = 'idle';
      state.bookingsError = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.bookingHistory = [];
      state.bookingsStatus = 'idle';
      state.bookingsError = null;
    },
    updateProfile: (state, action) => {
       if (state.user) {
         state.user = { ...state.user, ...action.payload };
       }
     },
    updatePreferences: (state, action) => {
       state.preferences = { ...state.preferences, ...action.payload };
     },
    addLoyaltyPoints: (state, action) => {
       state.loyaltyPoints += action.payload;
     },
    redeemLoyaltyPoints: (state, action) => {
       if (state.loyaltyPoints >= action.payload) {
         state.loyaltyPoints -= action.payload;
       }
     },
    // Action to add a *newly confirmed* booking directly
    addBookingToHistory: (state, action) => {
      // Avoid duplicates if fetchBookings runs immediately after
      const exists = state.bookingHistory.some(b => b.id === action.payload.id);
      if (!exists) {
           state.bookingHistory.unshift(action.payload); // Add to the start
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.bookingsStatus = 'loading';
        state.bookingsError = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookingsStatus = 'succeeded';
        // Sort bookings by date descending (most recent first)
        state.bookingHistory = action.payload.sort((a, b) => {
            const dateA = new Date(a.from?.date || a.date);
            const dateB = new Date(b.from?.date || b.date);
            // Handle invalid dates if necessary
            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
            return dateB - dateA; // Descending order
        });
        state.bookingsError = null;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.bookingsStatus = 'failed';
        state.bookingsError = action.payload; // Error message
      });
  },
});

export const {
  login,
  logout,
  updateProfile,
  updatePreferences,
  addLoyaltyPoints,
  redeemLoyaltyPoints,
  addBookingToHistory,
} = userSlice.actions;

export default userSlice.reducer;

export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUser = (state) => state.user.user;
export const selectUserId = (state) => state.user.user?.id; // Safely access user ID
export const selectPreferences = (state) => state.user.preferences;
export const selectLoyaltyPoints = (state) => state.user.loyaltyPoints;
export const selectBookingHistory = (state) => state.user.bookingHistory;
export const selectBookingsStatus = (state) => state.user.bookingsStatus;
export const selectBookingsError = (state) => state.user.bookingsError;

// Selectors to split history
export const selectUpcomingBookings = (state) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set time to start of today for comparison
  return state.user.bookingHistory.filter(trip => {
      try {
          const tripDate = new Date(trip.from?.date || trip.date);
          tripDate.setHours(0,0,0,0); // Compare dates only
          return !isNaN(tripDate.getTime()) && tripDate >= now;
      } catch (e) { return false; } // Exclude invalid dates
  });
};
export const selectPastBookings = (state) => {
   const now = new Date();
   now.setHours(0, 0, 0, 0); 
   return state.user.bookingHistory.filter(trip => {
       try {
           const tripDate = new Date(trip.from?.date || trip.date);
           tripDate.setHours(0,0,0,0);
           return !isNaN(tripDate.getTime()) && tripDate < now;
       } catch (e) { return false; }
   });
};
