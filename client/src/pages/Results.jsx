// src/pages/Results.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton'; 
import FloatingOrb from '../components/FloatingOrb';
import { Plane, Clock, Wifi, Coffee, Star, Filter, TrendingDown, TrendingUp } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFlights, selectFlightsStatus } from '../store/slices/flightsSlice';
import { setSelectedFlight } from '../store/slices/bookingSlice';

export default function Results() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('best');
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  // **Redux Integration Step:**
  // const flights = useSelector(selectFlights);
  // const status = useSelector(selectFlightsStatus);
  // if (status === 'loading') return <div>Loading...</div>
  // if (status === 'failed') return <div>Error...</div>
  
  // Using mock data as provided
  const flights = [
    {
      id: 1,
      airline: 'SkyWings',
      logo: '✈️',
      departure: { time: '08:30 AM', airport: 'JFK' },
      arrival: { time: '08:45 PM', airport: 'LHR' },
      duration: '7h 15m',
      stops: 'Non-stop',
      price: 459,
      amenities: ['wifi', 'meals', 'entertainment'],
      rating: 4.8,
      priceChange: 'down',
    },
    {
      id: 2,
      airline: 'Atlantic Air',
      logo: '🛫',
      departure: { time: '11:00 AM', airport: 'JFK' },
      arrival: { time: '11:30 PM', airport: 'LHR' },
      duration: '7h 30m',
      stops: 'Non-stop',
      price: 389,
      amenities: ['wifi', 'meals'],
      rating: 4.6,
      priceChange: 'down',
    },
    {
      id: 3,
      airline: 'EuroConnect',
      logo: '🌍',
      departure: { time: '02:15 PM', airport: 'JFK' },
      arrival: { time: '03:00 AM', airport: 'LHR' },
      duration: '8h 45m',
      stops: '1 stop (DUB)',
      price: 329,
      amenities: ['meals'],
      rating: 4.3,
      priceChange: 'up',
    },
    {
      id: 4,
      airline: 'Premium Airways',
      logo: '💎',
      departure: { time: '06:00 PM', airport: 'JFK' },
      arrival: { time: '06:15 AM', airport: 'LHR' },
      duration: '7h 15m',
      stops: 'Non-stop',
      price: 589,
      amenities: ['wifi', 'meals', 'entertainment', 'luxury'],
      rating: 4.9,
      priceChange: 'stable',
    },
  ];

  const amenityIcons = {
    wifi: <Wifi className="w-4 h-4" />,
    meals: <Coffee className="w-4 h-4" />,
    entertainment: <Star className="w-4 h-4" />,
    luxury: <Star className="w-4 h-4" />, // Using Star for luxury as a fallback
  };

  const handleSelectFlight = (flight) => {
    // **Redux Integration Step:**
    // dispatch(setSelectedFlight(flight));
    
    // For now, just navigate
    navigate('/booking/details');
  };

  return (
    <div className="relative min-h-screen px-4 pt-32 pb-20">
      <FloatingOrb size={250} color="#2563EB" delay={0} top="10%" right="5%" />
      <FloatingOrb size={200} color="#FACC15" delay={2} bottom="20%" left="10%" />

      <div className="max-w-7xl mx-auto">
        {/* Header with Price Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#2563EB] to-[#FACC15] bg-clip-text text-transparent">
              Available Flights
            </span>
          </h1>
          <p className="text-gray-300">New York (JFK) → London (LHR) • Dec 15, 2025</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <GlassCard className="sticky top-32">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-[#2563EB]" />
                <h2 className="text-xl font-semibold">Filters</h2>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-3">Sort By</label>
                <div className="space-y-2">
                  {['best', 'cheapest', 'fastest', 'earliest'].map((option) => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSortBy(option)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all capitalize ${
                        sortBy === option
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-3">Price Range</label>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    className="w-full accent-[#2563EB]"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>$0</span>
                    <span>$1000+</span>
                  </div>
                </div>
              </div>

              {/* Stops */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">Stops</label>
                <div className="space-y-2">
                  {['Non-stop', '1 stop', '2+ stops'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#2563EB]"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Flight Cards */}
          <div className="lg:col-span-3 space-y-6">
            {/* Price Trend Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard glow={true} glowColor="#FACC15" className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-6 h-6 text-[#FACC15]" />
                  <div>
                    <p className="text-sm">
                      <span className="text-[#FACC15]">Great news!</span> Prices are 12% lower than usual for this route.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {flights.map((flight, index) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <GlassCard
                  hover={true}
                  glow={selectedFlightId === flight.id}
                  glowColor="#2563EB"
                  className={`cursor-pointer transition-all ${
                    selectedFlightId === flight.id ? 'border-[#2563EB]' : ''
                  }`}
                  onClick={() => setSelectedFlightId(flight.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Airline Info */}
                    <div className="flex items-center gap-4 md:w-1/5">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl"
                      >
                        {flight.logo}
                      </motion.div>
                      <div>
                        <p className="font-medium">{flight.airline}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Star className="w-3 h-3 fill-[#FACC15] text-[#FACC15]" />
                          <span>{flight.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Flight Timeline */}
                    <div className="flex items-center gap-4 md:w-2/5">
                      <div className="text-center">
                        <p className="text-xl font-semibold">{flight.departure.time}</p>
                        <p className="text-sm text-gray-400">{flight.departure.airport}</p>
                      </div>

                      <div className="flex-1 relative">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#FACC15]" />
                          <Plane className="w-4 h-4 text-[#2563EB] -rotate-45" />
                          <div className="flex-1 h-[2px] bg-gradient-to-r from-[#FACC15] to-[#2563EB]" />
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-1">{flight.duration}</p>
                        <p className="text-xs text-center text-gray-500 mt-1">{flight.stops}</p>
                      </div>

                      <div className="text-center">
                        <p className="text-xl font-semibold">{flight.arrival.time}</p>
                        <p className="text-sm text-gray-400">{flight.arrival.airport}</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex gap-2 md:w-1/6">
                      {flight.amenities.map((amenity) => (
                        <motion.div
                          key={amenity}
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400"
                          title={amenity}
                        >
                          {amenityIcons[amenity]}
                        </motion.div>
                      ))}
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between md:flex-col md:items-end md:w-1/5 gap-3">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {flight.priceChange === 'down' && (
                            <TrendingDown className="w-4 h-4 text-green-400" />
                          )}
                          {flight.priceChange === 'up' && (
                            <TrendingUp className="w-4 h-4 text-red-400" />
                          )}
                          <p className="text-2xl font-bold text-[#FACC15]">${flight.price}</p>
                        </div>
                        <p className="text-xs text-gray-400">per person</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectFlight(flight);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-full text-sm font-semibold whitespace-nowrap hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all"
                      >
                        Select
                      </motion.button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}