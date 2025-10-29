// src/components/ReduxStatus.jsx
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { selectBookingStep, selectSelectedFlight, selectSelectedSeats } from '../store/slices/bookingSlice';
import { selectFlightsStatus } from '../store/slices/flightsSlice';
import { selectSeatMapStatus } from '../store/slices/seatMapSlice';
import { selectIsAuthenticated } from '../store/slices/userSlice';

/**
 * ReduxStatus Component
 * Displays current Redux state for development/debugging
 * Can be removed in production
 */
export default function ReduxStatus() {
  const bookingStep = useSelector(selectBookingStep);
  const flightsStatus = useSelector(selectFlightsStatus);
  const seatMapStatus = useSelector(selectSeatMapStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const selectedFlight = useSelector(selectSelectedFlight);
  const selectedSeats = useSelector(selectSelectedSeats);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50 p-4 bg-black/80 backdrop-blur-xl border border-[#2563EB]/30 rounded-xl text-xs max-w-xs"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#2563EB] font-semibold">Redux Status</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
      
      <div className="space-y-1 text-gray-300">
        <div className="flex justify-between">
          <span>Booking Step:</span>
          <span className="text-[#FACC15]">{bookingStep}</span>
        </div>
        <div className="flex justify-between">
          <span>Flights:</span>
          <span className="text-[#FACC15]">{flightsStatus}</span>
        </div>
        <div className="flex justify-between">
          <span>Seat Map:</span>
          <span className="text-[#FACC15]">{seatMapStatus}</span>
        </div>
        <div className="flex justify-between">
          <span>Auth:</span>
          <span className="text-[#FACC15]">{isAuthenticated ? 'Yes' : 'No'}</span>
        </div>
        <div className="flex justify-between">
          <span>Flight:</span>
          <span className="text-[#FACC15]">{selectedFlight ? '✓' : '✗'}</span>
        </div>
        <div className="flex justify-between">
          <span>Seats:</span>
          <span className="text-[#FACC15]">{selectedSeats.length}</span>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-white/10 text-center text-gray-500">
        Development Mode
      </div>
    </motion.div>
  );
}