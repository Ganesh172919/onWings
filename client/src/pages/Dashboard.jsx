// src/pages/Dashboard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import FloatingOrb from '../components/FloatingOrb';
import {
  Plane,
  Award,
  TrendingUp,
  Download,
  Share2,
  ChevronRight,
  Leaf,
  Crown,
  Settings,
  Bell
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectBookingHistory, selectLoyaltyPoints } from '../store/slices/userSlice';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const bookingHistory = useSelector(selectBookingHistory);
  const loyaltyPoints = useSelector(selectLoyaltyPoints);

  // **Redux Integration Step:**
//   const upcomingTrips = bookingHistory.filter(trip => new Date(trip.date) > new Date());
//   const pastTrips = bookingHistory.filter(trip => new Date(trip.date) <= new Date());
  
  // Using mock data as provided
  const upcomingTrips = [
    {
      id: 'ONW7X3F9',
      airline: 'SkyWings',
      logo: '✈️',
      from: { city: 'New York', code: 'JFK', time: '08:30 AM', date: 'Dec 15, 2025' },
      to: { city: 'London', code: 'LHR', time: '08:45 PM', date: 'Dec 15, 2025' },
      seat: '12A',
      gate: 'B24',
      terminal: '4',
      status: 'confirmed',
      class: 'Main Cabin'
    }
  ];

  const pastTrips = [
    {
      id: 'ONW2M8K1',
      airline: 'Atlantic Air',
      logo: '🛫',
      from: { city: 'Los Angeles', code: 'LAX' },
      to: { city: 'Tokyo', code: 'NRT' },
      date: 'Nov 10, 2025',
      status: 'completed'
    },
    {
      id: 'ONW5P9L4',
      airline: 'EuroConnect',
      logo: '🌍',
      from: { city: 'Miami', code: 'MIA' },
      to: { city: 'Paris', code: 'CDG' },
      date: 'Oct 22, 2025',
      status: 'completed'
    }
  ];

  const stats = {
    totalFlights: 12,
    loyaltyPoints: 4850, // Would be: loyaltyPoints
    co2Saved: 120,
    memberSince: '2024'
  };

  return (
    <div className="relative min-h-screen px-4 pt-32 pb-20">
      <FloatingOrb size={250} color="#2563EB" delay={0} top="10%" left="5%" />
      <FloatingOrb size={200} color="#FACC15" delay={2} bottom="20%" right="5%" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Welcome back, <span className="bg-gradient-to-r from-[#2563EB] to-[#FACC15] bg-clip-text text-transparent">Traveler</span>
              </h1>
              <p className="text-gray-300">Manage your flights and travel preferences</p>
            </div>
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              >
                <Bell className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: <Plane className="w-6 h-6" />,
              label: 'Total Flights',
              value: stats.totalFlights,
              color: '#2563EB',
              delay: 0.1
            },
            {
              icon: <Award className="w-6 h-6" />,
              label: 'Loyalty Points',
              value: stats.loyaltyPoints.toLocaleString(),
              color: '#FACC15',
              delay: 0.2
            },
            {
              icon: <Leaf className="w-6 h-6" />,
              label: 'CO₂ Offset',
              value: `${stats.co2Saved}kg`,
              color: '#10B981',
              delay: 0.3
            },
            {
              icon: <Crown className="w-6 h-6" />,
              label: 'Member Since',
              value: stats.memberSince,
              color: '#FACC15',
              delay: 0.4
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: stat.delay }}
            >
              <GlassCard hover={true} glow={true} glowColor={stat.color}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${stat.color}22`,
                    color: stat.color
                  }}
                >
                  {stat.icon}
                </div>
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: stat.delay + 0.2 }}
                  className="text-3xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </motion.p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex gap-4 mb-8"
        >
          {['upcoming', 'past'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full capitalize transition-all font-semibold ${
                selectedTab === tab
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white shadow-[0_0_30px_rgba(37,99,235,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {tab} Trips
            </motion.button>
          ))}
        </motion.div>

        {/* Trips List */}
        {selectedTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <GlassCard hover={true} glow={true} glowColor="#2563EB" className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Flight Info */}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl"
                          >
                            {trip.logo}
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-semibold">{trip.airline}</h3>
                            <p className="text-sm text-gray-400">{trip.class}</p>
                          </div>
                        </div>
                        
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="px-4 py-2 bg-green-500/20 border border-green-500 rounded-full text-sm text-green-400"
                        >
                          Confirmed
                        </motion.div>
                      </div>

                      {/* Timeline */}
                      <div className="grid md:grid-cols-3 gap-6 items-center mb-6">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Departure</p>
                          <p className="text-2xl font-semibold mb-1">{trip.from.time}</p>
                          <p className="text-lg">{trip.from.city}</p>
                          <p className="text-sm text-gray-400">{trip.from.code}</p>
                          <p className="text-sm text-[#2563EB] mt-1">{trip.from.date}</p>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="flex-1 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#FACC15]" />
                            <Plane className="w-5 h-5 text-[#FACC15] -rotate-45" />
                            <div className="flex-1 h-[2px] bg-gradient-to-r from-[#FACC15] to-[#2563EB]" />
                          </div>
                          <p className="text-sm text-gray-400">Direct Flight</p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-400 mb-1">Arrival</p>
                          <p className="text-2xl font-semibold mb-1">{trip.to.time}</p>
                          <p className="text-lg">{trip.to.city}</p>
                          <p className="text-sm text-gray-400">{trip.to.code}</p>
                          <p className="text-sm text-[#FACC15] mt-1">{trip.to.date}</p>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Booking ID</p>
                          <p className="font-mono text-sm text-[#2563EB]">{trip.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Seat</p>
                          <p className="text-sm font-semibold">{trip.seat}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Gate</p>
                          <p className="text-sm font-semibold">{trip.gate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="lg:w-64 flex flex-col gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-xl flex items-center justify-center gap-2 font-semibold hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Download Ticket
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                      >
                        <Share2 className="w-4 h-4" />
                        Share Trip
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                      >
                        Manage Booking
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

        {selectedTab === 'past' && (
          <div className="grid md:grid-cols-2 gap-6">
            {pastTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <GlassCard hover={true} className="cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl"
                    >
                      {trip.logo}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{trip.airline}</h3>
                      <p className="text-sm text-gray-400">{trip.date}</p>
                    </div>
                    <div className="px-3 py-1 bg-gray-500/20 rounded-full text-xs text-gray-400">
                      Completed
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <p className="text-sm text-gray-400">Route</p>
                      <p className="flex items-center gap-2 mt-1 font-semibold">
                        <span>{trip.from.code}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span>{trip.to.code}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Booking ID</p>
                      <p className="font-mono text-xs text-[#2563EB] mt-1">{trip.id}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Upgrade Available',
                description: 'Premium seats on your upcoming flight',
                color: '#FACC15',
                action: 'Upgrade Now'
              },
              {
                icon: <Leaf className="w-6 h-6" />,
                title: 'Carbon Offset',
                description: 'Contribute to environmental projects',
                color: '#10B981',
                action: 'Learn More'
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: 'Redeem Points',
                description: `You have ${stats.loyaltyPoints.toLocaleString()} loyalty points`,
                color: '#2563EB',
                action: 'Redeem'
              }
            ].map((card, index) => (
              <GlassCard key={index} hover={true} delay={0.8 + index * 0.1} className="cursor-pointer group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${card.color}22`,
                    color: card.color
                  }}
                >
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{card.description}</p>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: card.color }}>
                  <span>{card.action}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}