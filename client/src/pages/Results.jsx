// src/pages/Results.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import FloatingOrb from '../components/FloatingOrb';
import { Plane, Clock, Wifi, Coffee, Star, Filter, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFlights, selectFlightsStatus, selectFlightsError } from '../store/slices/flightsSlice';
import { setSelectedFlight, setStep } from '../store/slices/bookingSlice';

export default function Results() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('best');
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const flights = useSelector(selectFlights);
  const status = useSelector(selectFlightsStatus);
  const error = useSelector(selectFlightsError);

  const amenityIcons = {
    wifi: <Wifi className="w-4 h-4" />,
    meals: <Coffee className="w-4 h-4" />,
    entertainment: <Star className="w-4 h-4" />,
    luxury: <Star className="w-4 h-4" />,
  };

  // Sort flights
  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // 'best' - keep original order
  });

  const handleSelectFlight = (flight) => {
    dispatch(setSelectedFlight(flight));
    dispatch(setStep(3));
    navigate('/booking/details');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-text-secondary">Searching for the best flights...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="max-w-md text-center">
          <p className="text-error mb-4">Error loading flights: {error}</p>
          <GradientButton onClick={() => navigate('/search')}>
            Try Again
          </GradientButton>
        </GlassCard>
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassCard className="max-w-md text-center">
          <Plane className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">No Flights Found</h2>
          <p className="text-text-muted mb-6">Try adjusting your search criteria or select different airports.</p>
          <GradientButton onClick={() => navigate('/search')}>
            New Search
          </GradientButton>
        </GlassCard>
      </div>
    );
  }

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
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Available Flights
            </span>
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-text-secondary">
              Found {flights.length} flight{flights.length !== 1 ? 's' : ''} for your route
            </p>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <TrendingDown className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary font-semibold">Prices are 12% lower than usual</span>
            </div>
          </div>
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard className="flex justify-between items-center p-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-primary" />
              <span className="text-sm text-text-muted">Sort by:</span>
              <div className="flex gap-2">
                {[
                  { value: 'best', label: 'Best Match' },
                  { value: 'price', label: 'Price' },
                  { value: 'duration', label: 'Duration' },
                  { value: 'rating', label: 'Rating' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      sortBy === option.value
                        ? 'bg-primary text-white'
                        : 'bg-white/5 text-text-secondary hover:bg-white/10'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Flight Results */}
        <div className="space-y-6">
          {sortedFlights.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <GlassCard
                className={`p-6 cursor-pointer transition-all ${
                  selectedFlightId === flight.id ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
                onClick={() => setSelectedFlightId(flight.id)}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Flight Info */}
                  <div className="flex-1">
                    {/* Airline */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{flight.logo}</span>
                      <div>
                        <p className="font-semibold text-lg">{flight.airline}</p>
                        <p className="text-sm text-text-muted">{flight.flightNumber}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <Star className="w-4 h-4 text-secondary fill-current" />
                        <span className="font-semibold">{flight.rating}</span>
                      </div>
                    </div>

                    {/* Flight Times */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-3xl font-bold">{flight.departure.time}</p>
                        <p className="text-text-muted">{flight.departure.airport}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-px flex-1 bg-white/20"></div>
                          <Plane className="w-4 h-4 text-primary" />
                          <div className="h-px flex-1 bg-white/20"></div>
                        </div>
                        <p className="text-sm text-text-muted">{flight.duration}</p>
                        <p className="text-xs text-text-muted">{flight.stops}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold">{flight.arrival.time}</p>
                        <p className="text-text-muted">{flight.arrival.airport}</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center gap-4 flex-wrap">
                      {flight.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-1 text-text-muted">
                          {amenityIcons[amenity]}
                          <span className="text-xs capitalize">{amenity}</span>
                        </div>
                      ))}
                      {flight.carbonEmissions && (
                        <div className="flex items-center gap-1 text-accent-emerald text-xs">
                          <span>🌱 {flight.carbonEmissions}kg CO₂</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Pricing */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      {flight.priceChange && (
                        <div className={`flex items-center gap-1 mb-1 ${
                          flight.priceChange === 'down' ? 'text-accent-emerald' : 
                          flight.priceChange === 'up' ? 'text-error' : 'text-text-muted'
                        }`}>
                          {flight.priceChange === 'down' && <TrendingDown className="w-4 h-4" />}
                          {flight.priceChange === 'up' && <TrendingUp className="w-4 h-4" />}
                          {flight.priceChange === 'stable' && <Minus className="w-4 h-4" />}
                          <span className="text-xs">
                            {flight.priceChange === 'down' ? 'Price dropped' : 
                             flight.priceChange === 'up' ? 'Price increased' : 'Stable price'}
                          </span>
                        </div>
                      )}
                      <div className="text-4xl font-bold text-secondary mb-1">
                        ${flight.totalPrice || flight.price}
                      </div>
                      <p className="text-sm text-text-muted">per passenger</p>
                    </div>
                    <GradientButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectFlight(flight);
                      }}
                      className="w-full md:w-auto"
                    >
                      Select Flight
                    </GradientButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
