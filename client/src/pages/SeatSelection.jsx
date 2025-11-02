// src/pages/SeatSelection.jsx
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import FloatingOrb from '../components/FloatingOrb';
import { Armchair, X, Check } from 'lucide-react';
import '../styles/SeatSelection.css'; // Import the new CSS file
import { useDispatch } from 'react-redux';
import { toggleSeat as toggleSeatRedux, setTotalPrice, setStep } from '../store/slices/bookingSlice';

export default function SeatSelection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  // Seat map data
  const rows = 25;
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];

  // **PERFORMANCE FIX:**
  // Use useMemo to create a stable seat map.
  // Using Math.random() in a render function causes re-renders on every state change.
  const seatMap = useMemo(() => {
    const map = new Map();
    for (let r = 1; r <= rows; r++) {
      for (const c of columns) {
        const seatId = `${r}${c}`;
        let status = 'available';
        
        // Use a stable (but random-looking) algorithm
        if ((r < 5 && (r + c.charCodeAt(0)) % 3 === 0) || (r > 15 && r < 20 && (r + c.charCodeAt(0)) % 4 === 0)) {
          status = 'occupied';
        } else if (r <= 5 || r === 12 || r === 13) {
          status = 'premium';
        }
        map.set(seatId, status);
      }
    }
    return map;
  }, []); // Empty dependency array ensures this runs only once.

  // Get status based on the memoized map and selected state
  const getSeatStatus = (row, col) => {
    const seatId = `${row}${col}`;
    if (selectedSeats.includes(seatId)) return 'selected';
    return seatMap.get(seatId) || 'available';
  };

  const getSeatPrice = (status) => {
    if (status === 'premium') return 45;
    if (status === 'available') return 25;
    return 0;
  };

  const toggleSeat = (row, col) => {
    const seatId = `${row}${col}`;
    const status = getSeatStatus(row, col);
    
    if (status === 'occupied') return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatColor = (status) => {
    switch (status) {
      case 'selected':
        return {
          bg: 'bg-gradient-to-br from-[#FACC15] to-[#F59E0B]',
          border: 'border-[#FACC15]',
          shadow: '0 0 20px rgba(250, 204, 21, 0.6)'
        };
      case 'premium':
        return {
          bg: 'bg-gradient-to-br from-[#2563EB]/30 to-[#1E40AF]/30',
          border: 'border-[#2563EB]',
          shadow: '0 0 10px rgba(37, 99, 235, 0.3)'
        };
      case 'occupied':
        return {
          bg: 'bg-gray-700/50',
          border: 'border-gray-600',
          shadow: 'none'
        };
      default:
        return {
          bg: 'bg-white/5',
          border: 'border-white/20',
          shadow: 'none'
        };
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const row = parseInt(seatId.match(/\d+/)[0]);
    const col = seatId.match(/[A-F]/)[0];
    // Re-check status without 'selected' to get base price
    const baseStatus = seatMap.get(seatId) || 'available'; 
    return sum + getSeatPrice(baseStatus);
  }, 0);

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    // Save to Redux
    selectedSeats.forEach(seatId => {
      const baseStatus = seatMap.get(seatId) || 'available';
      dispatch(toggleSeatRedux({ id: seatId, price: getSeatPrice(baseStatus) }));
    });
    dispatch(setTotalPrice(totalPrice));
    dispatch(setStep(5));

    navigate('/booking/review');
  };

  return (
    <div className="relative min-h-screen px-4 pt-32 pb-20">
      <FloatingOrb size={250} color="#2563EB" delay={0} top="10%" left="5%" />
      <FloatingOrb size={200} color="#FACC15" delay={2} bottom="10%" right="5%" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#2563EB] to-[#FACC15] bg-clip-text text-transparent">
              Choose Your Seat
            </span>
          </h1>
          <p className="text-gray-300">Interactive 3D cabin view • JFK → LHR</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Seat Legend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <GlassCard className="sticky top-32">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Armchair className="w-5 h-5 text-[#2563EB]" />
                Legend
              </h2>

              <div className="space-y-4">
                {[
                  { label: 'Available', icon: '💺', color: 'bg-white/5 border-white/20', price: '$25' },
                  { label: 'Premium', icon: '✨', color: 'bg-[#2563EB]/20 border-[#2563EB]', price: '$45' },
                  { label: 'Selected', icon: '⭐', color: 'bg-gradient-to-br from-[#FACC15] to-[#F59E0B] border-[#FACC15]', price: '' },
                  { label: 'Occupied', icon: '❌', color: 'bg-gray-700/50 border-gray-600', price: '' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg border-2 ${item.color} flex items-center justify-center text-sm`}>
                        {item.icon}
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.price && (
                      <span className="text-sm text-gray-400">{item.price}</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Selected Seats Summary */}
              {selectedSeats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 pt-8 border-t border-white/10"
                >
                  <h3 className="text-lg font-semibold mb-4">Your Selection</h3>
                  <div className="space-y-2 mb-4">
                    {selectedSeats.map((seatId) => {
                      const row = parseInt(seatId.match(/\d+/)[0]);
                      const col = seatId.match(/[A-F]/)[0];
                      const baseStatus = seatMap.get(seatId) || 'available';
                      return (
                        <motion.div
                          key={seatId}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                        >
                          <span className="text-sm">Seat {seatId}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-[#FACC15]">
                              ${getSeatPrice(baseStatus)}
                            </span>
                            <button
                              onClick={() => toggleSeat(row, col)}
                              className="text-gray-400 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between items-center text-lg pt-4 border-t border-white/10">
                    <span className="font-semibold">Seat Total</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.2, color: '#FACC15' }}
                      animate={{ scale: 1, color: '#FFFFFF' }}
                      className="text-2xl font-bold"
                    >
                      ${totalPrice}
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>

          {/* Seat Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <GlassCard className="p-8" glow={true} glowColor="#2563EB">
              {/* Cockpit */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
              >
                <div className="w-32 h-16 mx-auto bg-gradient-to-b from-[#2563EB]/30 to-transparent rounded-t-full border-t-2 border-x-2 border-[#2563EB]/50 flex items-center justify-center">
                  <span className="text-xs text-gray-400">COCKPIT</span>
                </div>
              </motion.div>

              {/* Seat Grid */}
              <div className="max-w-2xl mx-auto">
                {/* Column Headers */}
                <div className="flex justify-center gap-2 mb-4">
                  <div className="w-8" /> {/* Spacer for row number */}
                  <div className="grid grid-cols-6 gap-2 w-full max-w-md">
                    {columns.map((col) => (
                      <div key={col} className="text-center text-sm text-gray-400">
                        {col}
                      </div>
                    ))}
                  </div>
                  <div className="w-8" /> {/* Spacer for row number */}
                </div>

                {/* Rows */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {[...Array(rows)].map((_, rowIndex) => {
                    const row = rowIndex + 1;
                    return (
                      <motion.div
                        key={row}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + rowIndex * 0.02 }}
                        className="flex items-center justify-center gap-2"
                      >
                        {/* Row number */}
                        <div className="w-8 text-center text-sm text-gray-400">
                          {row}
                        </div>

                        {/* Seats */}
                        <div className="grid grid-cols-6 gap-2 w-full max-w-md">
                          {columns.map((col, colIndex) => {
                            const status = getSeatStatus(row, col);
                            const seatId = `${row}${col}`;
                            const colors = getSeatColor(status);
                            const isMiddle = colIndex === 2;

                            return (
                              <div key={col} className={`flex ${isMiddle ? 'mr-4' : ''}`}>
                                <motion.button
                                  whileHover={status !== 'occupied' ? {
                                    scale: 1.1,
                                    y: -4,
                                  } : {}}
                                  whileTap={status !== 'occupied' ? { scale: 0.95 } : {}}
                                  onClick={() => toggleSeat(row, col)}
                                  onMouseEnter={() => setHoveredSeat(seatId)}
                                  onMouseLeave={() => setHoveredSeat(null)}
                                  disabled={status === 'occupied'}
                                  className={`
                                    relative w-10 h-10 rounded-lg border-2 ${colors.bg} ${colors.border}
                                    flex items-center justify-center
                                    transition-all duration-300
                                    ${status === 'occupied' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                                    ${status === 'selected' ? 'ring-2 ring-[#FACC15] ring-offset-2 ring-offset-[#0B1120]' : ''}
                                  `}
                                  style={{
                                    boxShadow: colors.shadow,
                                  }}
                                >
                                  {status === 'selected' && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      exit={{ scale: 0 }}
                                    >
                                      <Check className="w-5 h-5 text-white" />
                                    </motion.div>
                                  )}
                                  {status === 'occupied' && (
                                    <X className="w-4 h-4 text-gray-500" />
                                  )}
                                  
                                  {/* Hover tooltip */}
                                  {hoveredSeat === seatId && status !== 'occupied' && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 bg-black/90 backdrop-blur-sm rounded-lg text-xs whitespace-nowrap border border-white/20"
                                    >
                                      <div className="text-white">{seatId}</div>
                                      <div className="text-[#FACC15]">${getSeatPrice(seatMap.get(seatId))}</div>
                                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-r border-b border-white/20" />
                                    </motion.div>
                                  )}
                                </motion.button>
                              </div>
                            );
                          })}
                        </div>

                        {/* Row number (right) */}
                        <div className="w-8 text-center text-sm text-gray-400">
                          {row}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Exit Row Indicators */}
                <div className="mt-4 text-center text-xs text-gray-500">
                  Rows 12-13: Emergency Exit Rows
                </div>
              </div>

              {/* Continue Button */}
              <div className="mt-8 flex justify-center">
                <GradientButton
                  onClick={handleContinue}
                  variant="primary"
                  disabled={selectedSeats.length === 0}
                  className="min-w-64"
                >
                  Continue to Review
                </GradientButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}