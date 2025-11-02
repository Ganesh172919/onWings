// src/pages/Search.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import FloatingOrb from '../components/FloatingOrb';
import { Calendar, MapPin, Users, ArrowRight, Plane, TrendingUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchParams, setStep } from '../store/slices/bookingSlice';
import { fetchFlights, clearFlights } from '../store/slices/flightsSlice';
import { airports, trendingRoutes as mockTrendingRoutes } from '../data/mockData';

export default function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tripType, setTripType] = useState('roundtrip');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    if (!searchData.from || !searchData.to || !searchData.departure) {
      alert("Please fill in departure/arrival locations and departure date.");
      return;
    }
    dispatch(clearFlights());
    dispatch(setSearchParams(searchData));
    dispatch(fetchFlights(searchData));
    dispatch(setStep(2));
    navigate('/search/results');
  };

  const handleQuickSearch = (route) => {
    setSearchData(prev => ({
      ...prev,
      from: route.from.code,
      to: route.to.code,
    }));
  };

  return (
    <div className="relative min-h-screen px-4 pt-32 pb-20">
      {/* Floating Orbs */}
      <FloatingOrb size={250} color="#2563EB" delay={0} top="20%" left="10%" />
      <FloatingOrb size={200} color="#FACC15" delay={2} bottom="20%" right="15%" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Smart Flight Search
            </span>
          </h1>
          <p className="text-text-secondary text-lg">
            Discover the best routes with AI-powered recommendations
          </p>
        </motion.div>

        {/* Main Search Card */}
        <GlassCard delay={0.2} glow={true} glowColor="#2563EB" className="mb-12">
          {/* Trip Type Toggle */}
          <div className="flex gap-4 mb-8">
            {['roundtrip', 'oneway', 'multicity'].map((type) => (
              <motion.button
                key={type}
                onClick={() => setTripType(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full transition-all duration-300 capitalize ${
                  tripType === type
                    ? 'bg-gradient-primary text-white shadow-glow'
                    : 'bg-white/5 text-text-secondary hover:bg-white/10'
                }`}
              >
                {type.replace('_', ' ')}
              </motion.button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* From */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <label className="block text-sm text-text-muted mb-2">From</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <select
                  name="from"
                  value={searchData.from}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:shadow-glow transition-all appearance-none"
                >
                  <option value="" className="bg-background-alt">Select departure city</option>
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code} className="bg-background-alt">
                      {airport.city} ({airport.code}) - {airport.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* To */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <label className="block text-sm text-text-muted mb-2">To</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <select
                  name="to"
                  value={searchData.to}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-secondary focus:shadow-glow transition-all appearance-none"
                >
                  <option value="" className="bg-background-alt">Select arrival city</option>
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code} className="bg-background-alt">
                      {airport.city} ({airport.code}) - {airport.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Departure Date */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <label className="block text-sm text-text-muted mb-2">Departure</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="date"
                  name="departure"
                  value={searchData.departure}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:shadow-glow transition-all"
                />
              </div>
            </motion.div>

            {/* Return Date */}
            {tripType === 'roundtrip' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-sm text-text-muted mb-2">Return</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                  <input
                    type="date"
                    name="return"
                    value={searchData.return}
                    onChange={handleInputChange}
                    min={searchData.departure || new Date().toISOString().split('T')[0]}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-secondary focus:shadow-glow transition-all"
                  />
                </div>
              </motion.div>
            )}

            {/* Passengers */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <label className="block text-sm text-text-muted mb-2">Passengers</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <select
                  name="passengers"
                  value={searchData.passengers}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:shadow-glow transition-all appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num} className="bg-background-alt">
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </div>

          {/* Search Button */}
          <GradientButton onClick={handleSearch} variant="primary" className="w-full">
            <span className="flex items-center justify-center gap-2">
              Search Flights
              <ArrowRight className="w-5 h-5" />
            </span>
          </GradientButton>
        </GlassCard>

        {/* AI Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <GlassCard glow={true} glowColor="#FACC15" className="p-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TrendingUp className="w-8 h-8 text-secondary" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">AI-Powered Insights</h3>
                <p className="text-sm text-text-muted">
                  Based on your search patterns, we recommend booking 3-4 weeks in advance for the best prices.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Trending Routes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Plane className="w-6 h-6 text-primary" />
            Trending Routes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockTrendingRoutes.slice(0, 3).map((route, index) => (
              <GlassCard
                key={route.id}
                delay={0.6 + index * 0.1}
                className="cursor-pointer group hover:shadow-glow transition-all"
                onClick={() => handleQuickSearch(route)}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-4xl"
                  >
                    ✈️
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 right-3 bg-secondary/90 text-background px-2 py-1 rounded-full text-xs font-bold">
                    {route.savings} OFF
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-text-muted">From</p>
                    <p className="font-medium">{route.from.city}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary mt-4" />
                  <div className="text-right">
                    <p className="text-sm text-text-muted">To</p>
                    <p className="font-medium">{route.to.city}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-sm text-text-muted">Starting from</span>
                  <span className="text-xl font-bold text-secondary">{route.price}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
