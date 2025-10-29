// src/pages/BookingDetails.jsx
import { useState, useEffect } from 'react'; // Added useEffect
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import FloatingOrb from '../components/FloatingOrb';
import { User, Mail, Calendar, Check, Briefcase, Package, Crown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addPassenger,
    selectFareBundle as dispatchSelectFareBundle, // Renamed import to avoid conflict
    setStep,
    selectSelectedFlight,
    clearPassengers // Added action to clear previous passengers
} from '../store/slices/bookingSlice';

export default function BookingDetails() {
    const navigate = useNavigate();
    // *** useDispatch and useSelector ***
    const dispatch = useDispatch();
    const selectedFlight = useSelector(selectSelectedFlight); // Get selected flight details

    // *** Use selectedFareId for local state ***
    const [selectedFareId, setSelectedFareId] = useState('main'); // Default to 'main'
    const [passengers, setPassengers] = useState([
        { firstName: '', lastName: '', dob: '', email: '' }
        // Add more initial passenger objects if needed based on searchParams
    ]);

    // Update local passenger state if needed when component loads or searchParams change
    // Example: useEffect(() => { setPassengers(initialPassengersBasedOnSearchParams) }, [searchParams]);

    // Handler to update passenger info in local state
    const handlePassengerChange = (index, field, value) => {
        const newPassengers = [...passengers];
        newPassengers[index][field] = value;
        setPassengers(newPassengers);
    };

    // Fares - use data from selectedFlight if available, otherwise use mock
    const fareTypes = selectedFlight?.fareBundles || [
        {
            id: 'basic', name: 'Basic', icon: <Package className="w-6 h-6" />, price: 389,
            features: ['Carry-on bag', 'Seat selection (fee)', 'No changes'], color: '#6B7280'
        },
        {
            id: 'main', name: 'Main', icon: <Briefcase className="w-6 h-6" />, price: 459,
            features: ['Carry-on + checked bag', 'Free seat selection', 'Changes (fee)'], color: '#2563EB', popular: true
        },
        {
            id: 'business', name: 'Business', icon: <Crown className="w-6 h-6" />, price: 1299,
            features: ['2 checked bags', 'Premium seat', 'Free changes', 'Lounge access'], color: '#FACC15'
        }
    ];

    // Initialize selectedFareId based on selectedFlight if needed
    useEffect(() => {
        // If there's a default fare or you want to pre-select based on flight
        // setSelectedFareId(selectedFlight?.defaultFareId || 'main');
    }, [selectedFlight]);


    const handleContinue = () => {
        // Basic validation
        const firstPassenger = passengers[0];
        if (!firstPassenger.firstName || !firstPassenger.lastName || !firstPassenger.dob || !firstPassenger.email) {
            alert("Please fill in all details for Passenger 1.");
            return;
        }
        // Add more validation as needed (email format, DOB format, etc.)

        // *** Dispatch actions ***
        dispatch(clearPassengers()); // Clear any passengers from a previous attempt
        passengers.forEach((p) => {
            dispatch(addPassenger({ ...p })); // Dispatch each passenger from local state
        });

        const chosenFare = fareTypes.find(f => f.id === selectedFareId);
        if (chosenFare) {
            dispatch(dispatchSelectFareBundle(chosenFare)); // Dispatch the selected fare object
        }

        dispatch(setStep(4)); // Move to seat selection step
        navigate('/booking/seats');
    };

    const selectedFareData = fareTypes.find(f => f.id === selectedFareId) || fareTypes[0];
    const basePrice = selectedFareData?.price || 0;
    const taxesAndFees = 89; // Mock tax amount
    const totalCost = basePrice + taxesAndFees;

    // Guard if selectedFlight is missing
    if (!selectedFlight) {
        useEffect(() => { navigate('/search'); }, [navigate]); // Redirect if no flight selected
        return <div className="min-h-screen pt-32 text-center">No flight selected. Redirecting...</div>;
    }

    return (
        <div className="relative min-h-screen px-4 pt-32 pb-20">
            <FloatingOrb size={250} color="#2563EB" delay={0} top="15%" left="5%" />
            <FloatingOrb size={200} color="#FACC15" delay={2} bottom="15%" right="5%" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-[#2563EB] to-[#FACC15] bg-clip-text text-transparent">
                            Passenger Details
                        </span>
                    </h1>
                    <p className="text-gray-300">Complete your booking information</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Passenger Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <GlassCard glow={true} glowColor="#2563EB">
                                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                    <User className="w-6 h-6 text-[#2563EB]" />
                                    Traveler Information
                                </h2>

                                {passengers.map((passenger, index) => (
                                    <div key={index} className="space-y-4 mb-6 pb-6 border-b border-white/10 last:border-0 last:mb-0 last:pb-0">
                                        <p className="text-sm text-gray-400">Passenger {index + 1}</p>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {/* First Name Input */}
                                            <motion.div whileHover={{ scale: 1.02 }}>
                                                <label className="block text-sm text-gray-400 mb-2">First Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563EB]" />
                                                    <input
                                                        type="text"
                                                        placeholder="John"
                                                        value={passenger.firstName} // Controlled
                                                        onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                                                    />
                                                </div>
                                            </motion.div>
                                            {/* Last Name Input */}
                                            <motion.div whileHover={{ scale: 1.02 }}>
                                                <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563EB]" />
                                                    <input
                                                        type="text"
                                                        placeholder="Doe"
                                                        value={passenger.lastName} // Controlled
                                                        onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                                                    />
                                                </div>
                                            </motion.div>
                                            {/* DOB Input */}
                                            <motion.div whileHover={{ scale: 1.02 }}>
                                                <label className="block text-sm text-gray-400 mb-2">Date of Birth</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563EB]" />
                                                    <input
                                                        type="date"
                                                        value={passenger.dob} // Controlled
                                                        onChange={(e) => handlePassengerChange(index, 'dob', e.target.value)}
                                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all appearance-none" // Added appearance-none
                                                        style={{ colorScheme: 'dark' }} // Hint for dark theme date picker
                                                    />
                                                </div>
                                            </motion.div>
                                            {/* Email Input */}
                                            <motion.div whileHover={{ scale: 1.02 }}>
                                                <label className="block text-sm text-gray-400 mb-2">Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563EB]" />
                                                    <input
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        value={passenger.email} // Controlled
                                                        onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                                {/* Add Button for more passengers if needed */}
                                {/* <button onClick={() => setPassengers([...passengers, { firstName: '', ... }])}>+ Add Passenger</button> */}
                            </GlassCard>
                        </motion.div>

                        {/* Fare Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h2 className="text-2xl font-semibold mb-6">Choose Your Experience</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {fareTypes.map((fare, index) => (
                                    <motion.div
                                        key={fare.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                    >
                                        <GlassCard
                                            hover={true}
                                            glow={selectedFareId === fare.id} // Use local state ID
                                            glowColor={fare.color}
                                            className={`cursor-pointer h-full relative ${selectedFareId === fare.id ? `border-2` : 'border border-white/10' // Use local state ID
                                                }`}
                                            style={{ borderColor: selectedFareId === fare.id ? fare.color : undefined }} // Use local state ID
                                            onClick={() => setSelectedFareId(fare.id)} // Update local state ID
                                        >
                                            {fare.popular && (
                                                <motion.div
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-full text-xs font-semibold"
                                                >
                                                    Most Popular
                                                </motion.div>
                                            )}

                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                                style={{ backgroundColor: `${fare.color}22`, color: fare.color }}
                                            >
                                                {fare.icon}
                                            </div>

                                            <h3 className="text-xl font-semibold mb-2">{fare.name}</h3>
                                            <div className="text-3xl font-bold mb-4" style={{ color: fare.color }}>
                                                ${fare.price}
                                            </div>

                                            <div className="space-y-3">
                                                {fare.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: fare.color }} />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {selectedFareId === fare.id && ( // Use local state ID
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: fare.color }}
                                                >
                                                    <Check className="w-4 h-4 text-white" />
                                                </motion.div>
                                            )}
                                        </GlassCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Price Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-1"
                    >
                        <GlassCard className="sticky top-32" glow={true} glowColor="#FACC15">
                            <h2 className="text-xl font-semibold mb-6">Booking Summary</h2>
                            {/* Flight Info */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Route</span>
                                    <span>{selectedFlight.departure.airport} → {selectedFlight.arrival.airport}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Date</span>
                                    <span>{selectedFlight.departure.date}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Passengers</span>
                                    <span>{passengers.length} Adult</span>
                                </div>
                            </div>
                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Base Fare ({selectedFareData.name})</span>
                                    <span>${basePrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Taxes & Fees (Est.)</span>
                                    <span>${taxesAndFees}</span>
                                </div>
                            </div>
                            {/* Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl">Total (Excl. Seats)</span>
                                <motion.span
                                    key={selectedFareId} // Key by local state ID
                                    initial={{ scale: 1.2, color: '#FACC15' }}
                                    animate={{ scale: 1, color: '#FFFFFF' }}
                                    className="text-3xl font-bold"
                                >
                                    ${totalCost}
                                </motion.span>
                            </div>
                            <GradientButton onClick={handleContinue} variant="primary" className="w-full">
                                Continue to Seats
                            </GradientButton>
                            {/* Trust Badge */}
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-gray-400"
                            >
                                🔒 Secure payment • Best price guarantee
                            </motion.div>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}