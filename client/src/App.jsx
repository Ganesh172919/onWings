// src/App.jsx
import { Provider } from 'react-redux';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/store';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Results from './pages/Results';
import BookingDetails from './pages/BookingDetails';
import SeatSelection from './pages/SeatSelection';
import Review from './pages/Review';
import Dashboard from './pages/Dashboard';
import AnimatedNavbar from './components/AnimatedNavbar';
import ReduxStatus from './components/ReduxStatus';

import './styles/globals.css';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="relative min-h-screen bg-[#0B1120] text-white overflow-x-hidden">
          {/* Animated Background Gradient */}
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0B1120] opacity-60" />
          
          {/* Volumetric Light Effects */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2563EB] rounded-full opacity-10 blur-[120px] animate-pulse" />
            <div 
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FACC15] rounded-full opacity-10 blur-[120px] animate-pulse" 
              style={{ animationDelay: '1s' }} 
            />
          </div>

          <AnimatedNavbar />
          
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/results" element={<Results />} />
              <Route path="/booking/details" element={<BookingDetails />} />
              <Route path="/booking/seats" element={<SeatSelection />} />
              <Route path="/booking/review" element={<Review />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Redux Status Monitor (development only) */}
          <ReduxStatus />
        </div>
      </Router>
    </Provider>
  );
}