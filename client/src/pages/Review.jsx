import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import FloatingOrb from '../components/FloatingOrb';
import {
    CheckCircle2, Plane, Calendar, Clock, User, Armchair, CreditCard, Shield, Sparkles
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectSelectedFlight,
    selectPassengers,
    selectSelectedSeats,
    selectSelectedFareBundle,
    confirmBooking,
    resetBooking,
    selectConfirmationStatus,
    selectConfirmationError,
    selectBookingReference
} from '../store/slices/bookingSlice';
import { addBookingToHistory } from '../store/slices/userSlice';

// Helper to calculate final total
const calculateFinalTotal = (flight, fareBundle, seats) => {
    const baseFare = fareBundle?.price ?? flight?.price ?? 0;
    const seatTotal = seats?.reduce((sum, s) => sum + (s.price || 0), 0) ?? 0;
    const taxes = Math.round((baseFare + seatTotal) * 0.15); // Example tax calculation
    return baseFare + seatTotal + taxes;
};

// Helper to format date strings nicely
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return dateString; }
};

export default function Review() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedFlight = useSelector(selectSelectedFlight);
    const passengers = useSelector(selectPassengers);
    const selectedSeats = useSelector(selectSelectedSeats);
    const selectedFareBundle = useSelector(selectSelectedFareBundle);
    const confirmationStatus = useSelector(selectConfirmationStatus);
    const confirmationError = useSelector(selectConfirmationError);
    const bookingReference = useSelector(selectBookingReference);

    const finalTotalPrice = useMemo(() => calculateFinalTotal(selectedFlight, selectedFareBundle, selectedSeats),
        [selectedFlight, selectedFareBundle, selectedSeats]);

    const [isConfirmedUI, setIsConfirmedUI] = useState(false);

    useEffect(() => {
        if (confirmationStatus === 'succeeded' && bookingReference) {
            setIsConfirmedUI(true);
            const bookingSummary = {
                id: bookingReference, bookingReference, status: 'confirmed',
                airline: selectedFlight?.airline, logo: selectedFlight?.logo, flightNumber: selectedFlight?.flightNumber,
                from: selectedFlight?.departure, to: selectedFlight?.arrival, date: selectedFlight?.departure?.date,
                seats: selectedSeats.map(s => s.id), class: selectedFareBundle?.name || 'Unknown',
                passengers: passengers.map(p => `${p.firstName} ${p.lastName}`),
                totalPrice: finalTotalPrice, bookingDate: new Date().toISOString().split('T')[0],
            };
            dispatch(addBookingToHistory(bookingSummary));
        } else if (confirmationStatus === 'failed') {
            console.error("Booking failed:", confirmationError);
            // Optionally show alert or notification
        }
    }, [confirmationStatus, bookingReference, confirmationError, dispatch, selectedFlight, passengers, selectedSeats, selectedFareBundle, finalTotalPrice]);

    const handleConfirmBooking = () => {
        if (confirmationStatus !== 'loading') {
            dispatch(confirmBooking());
        }
    };

    // Guard clause if essential data is missing
    if (!selectedFlight || !passengers || passengers.length === 0 || !selectedSeats || selectedSeats.length === 0) {
        useEffect(() => { navigate('/search'); }, [navigate]);
        return <div className="min-h-screen pt-32 text-center text-gray-400">Missing booking details. Redirecting...</div>;
    }

    // --- Confirmation Success UI ---
    if (isConfirmedUI) {
        return (
            <div className="relative min-h-screen px-4 pt-32 pb-20 flex items-center justify-center">
                <FloatingOrb size={300} color="#FACC15" delay={0} top="20%" left="10%" />
                <FloatingOrb size={250} color="#2563EB" delay={1} bottom="20%" right="10%" />
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                    className="max-w-2xl w-full"
                >
                    <GlassCard className="text-center p-12 relative" glow={true} glowColor="#FACC15">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }} className="mb-8">
                            <div className="relative inline-block">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 -m-4">
                                    <div className="w-full h-full border-4 border-transparent border-t-[#FACC15] rounded-full" />
                                </motion.div>
                                <CheckCircle2 className="w-24 h-24 text-[#FACC15] relative z-10" />
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4"> <span className="bg-gradient-to-r from-[#FACC15] to-[#F59E0B] bg-clip-text text-transparent"> Booking Confirmed! </span> </h1>
                            <p className="text-gray-300 text-lg mb-8"> Your flight is booked and ready to go! </p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-sm text-gray-400 mb-2">Booking Reference</p>
                            <motion.p animate={{ textShadow: ['0 0 10px rgba(250, 204, 21, 0.5)', '0 0 20px rgba(250, 204, 21, 0.8)', '0 0 10px rgba(250, 204, 21, 0.5)'] }} transition={{ duration: 2, repeat: Infinity }}
                                className="text-3xl font-bold tracking-wider text-[#FACC15]"
                            > {bookingReference} </motion.p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-white/5 rounded-xl"> <Calendar className="w-6 h-6 text-[#2563EB] mx-auto mb-2" /> <p className="text-sm text-gray-400">Departure</p> <p className="font-medium">{formatDate(selectedFlight.departure.date)}</p> </div>
                            <div className="p-4 bg-white/5 rounded-xl"> <Plane className="w-6 h-6 text-[#FACC15] mx-auto mb-2" /> <p className="text-sm text-gray-400">Flight</p> <p className="font-medium">{selectedFlight.flightNumber}</p> </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="space-y-4">
                            <GradientButton onClick={() => { dispatch(resetBooking()); navigate('/dashboard'); }} variant="primary" className="w-full"> View My Bookings </GradientButton>
                            <button onClick={() => { dispatch(resetBooking()); navigate('/'); }} className="w-full px-8 py-4 text-gray-300 hover:text-white transition-colors"> Back to Home </button>
                        </motion.div>
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                            {[...Array(20)].map((_, i) => <motion.div key={i} initial={{ y: -20, x: Math.random() * 100 + '%', opacity: 1 }} animate={{ y: '120vh', opacity: 0, rotate: Math.random() * 360 }} transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5, ease: 'easeIn' }} className="absolute w-3 h-3 rounded-full" style={{ backgroundColor: i % 2 === 0 ? '#FACC15' : '#2563EB' }} />)}
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        );
    }

    // --- Review Details UI ---
    const baseFarePrice = selectedFareBundle?.price ?? selectedFlight?.price ?? 0;
    const seatPriceTotal = selectedSeats.reduce((sum, s) => sum + (s.price || 0), 0);
    const taxesAndFees = finalTotalPrice - baseFarePrice - seatPriceTotal;

    return (
        <div className="relative min-h-screen px-4 pt-32 pb-20">
            <FloatingOrb size={250} color="#2563EB" delay={0} top="15%" left="5%" />
            <FloatingOrb size={200} color="#FACC15" delay={2} bottom="15%" right="5%" />
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2"> <span className="bg-gradient-to-r from-[#2563EB] to-[#FACC15] bg-clip-text text-transparent"> Review & Confirm </span> </h1>
                    <p className="text-gray-300">Please review your booking details before confirming</p>
                </motion.div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Flight Details */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                            <GlassCard glow={true} glowColor="#2563EB">
                                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"> <Plane className="w-6 h-6 text-[#2563EB]" /> Flight Information </h2>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                                        <div className="text-4xl">{selectedFlight.logo || '✈️'}</div>
                                        <div> <p className="text-xl font-semibold">{selectedFlight.airline}</p> <p className="text-sm text-gray-400">Flight {selectedFlight.flightNumber}</p> </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6 items-center">
                                        <div> <p className="text-sm text-gray-400 mb-1">Departure</p> <p className="text-2xl font-semibold mb-1">{selectedFlight.departure.time}</p> <p className="text-gray-300">{selectedFlight.departure.city}</p><p className="text-sm text-gray-400">{selectedFlight.departure.airport}</p> <p className="text-sm text-[#2563EB] mt-1">{formatDate(selectedFlight.departure.date)}</p> </div>
                                        <div className="text-center"> <div className="flex items-center justify-center gap-2 mb-2"><div className="flex-1 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#FACC15]" /><Clock className="w-5 h-5 text-[#FACC15]" /><div className="flex-1 h-[2px] bg-gradient-to-r from-[#FACC15] to-[#2563EB]" /></div> <p className="text-sm text-gray-400">{selectedFlight.duration}</p> </div>
                                        <div className="text-right"> <p className="text-sm text-gray-400 mb-1">Arrival</p> <p className="text-2xl font-semibold mb-1">{selectedFlight.arrival.time}</p> <p className="text-gray-300">{selectedFlight.arrival.city}</p><p className="text-sm text-gray-400">{selectedFlight.arrival.airport}</p> <p className="text-sm text-[#FACC15] mt-1">{formatDate(selectedFlight.arrival.date)}</p> </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                        {/* Passenger Details */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                            <GlassCard>
                                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"> <User className="w-6 h-6 text-[#2563EB]" /> Passenger Information </h2>
                                <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                                    {passengers.map((p, index) => (
                                        <div key={index} className="mb-2 last:mb-0">
                                            <p className="text-sm text-gray-400 mb-1">Passenger {index + 1}</p>
                                            <p className="text-lg">{p.firstName} {p.lastName}</p>
                                            <p className="text-sm truncate" title={p.email}>{p.email}</p>
                                            <p className="text-sm">DOB: {formatDate(p.dob)}</p>
                                        </div>
                                    ))}
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Fare Type</p>
                                        <p className="text-lg">{selectedFareBundle?.name || 'N/A'}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                        {/* Seat Selection */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                            <GlassCard>
                                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"> <Armchair className="w-6 h-6 text-[#FACC15]" /> Seat Selection </h2>
                                <div className="flex flex-wrap gap-4">
                                    {selectedSeats.map((seat) => (
                                        <div key={seat.id} className="px-4 py-2 bg-gradient-to-br from-[#FACC15]/20 to-[#F59E0B]/20 border border-[#FACC15] rounded-lg text-center">
                                            <p className="text-lg font-bold text-[#FACC15]">{seat.id}</p>
                                            <p className="text-xs text-gray-300">${seat.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Price Summary & Payment */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-1">
                        <div className="space-y-6 sticky top-32">
                            <GlassCard glow={true} glowColor="#FACC15">
                                <h2 className="text-xl font-semibold mb-6">Price Summary</h2>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm"> <span>Base Fare ({selectedFareBundle?.name || 'N/A'})</span> <span>${baseFarePrice.toFixed(2)}</span> </div>
                                    <div className="flex justify-between text-sm"> <span>Seat Selection ({selectedSeats.length})</span> <span>${seatPriceTotal.toFixed(2)}</span> </div>
                                    <div className="flex justify-between text-sm"> <span>Taxes & Fees (Est.)</span> <span>${taxesAndFees >= 0 ? taxesAndFees.toFixed(2) : 'N/A'}</span> </div>
                                    <div className="pt-4 border-t border-white/10">
                                        <div className="flex justify-between items-center"> <span className="text-xl">Total</span> <span className="text-3xl font-bold text-[#FACC15]">${finalTotalPrice.toFixed(2)}</span> </div>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {confirmationStatus === 'loading' ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8 text-center text-gray-300">
                                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full mx-auto mb-4" />
                                            Confirming your booking...
                                        </motion.div>
                                    ) : (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <GradientButton onClick={handleConfirmBooking} disabled={confirmationStatus === 'loading'} variant="primary" className="w-full mb-4">
                                                <span className="flex items-center justify-center gap-2"> <CreditCard className="w-5 h-5" /> Confirm & Pay </span>
                                            </GradientButton>
                                            {confirmationStatus === 'failed' && (
                                                <p className="text-sm text-red-400 text-center mt-2">{confirmationError || 'An error occurred during booking.'}</p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="space-y-3 pt-6 border-t border-white/10">
                                    {[ { icon: Shield, text: 'Secure Payment Processing' }, { icon: CheckCircle2, text: 'Best Price Guarantee' }, { icon: Sparkles, text: 'Instant Confirmation' }
                                    ].map((item, index) => (
                                        <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.1 }} className="flex items-center gap-3 text-sm text-gray-400">
                                            <item.icon className="w-4 h-4 text-[#2563EB]" /> <span>{item.text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </GlassCard>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

