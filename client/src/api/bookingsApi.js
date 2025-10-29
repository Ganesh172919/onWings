// src/api/bookingsApi.js

/**
 * ==========================================
 * Bookings API - Mock Implementation
 * ==========================================
 * Simulates interactions with a backend booking system.
 * Replace with actual API calls in production.
 */

/**
 * Create a new booking (Mock)
 * @param {Object} bookingData - Complete booking information
 * @returns {Promise<Object>} Mock booking confirmation
 */
export const createBooking = async (bookingData) => {
  console.log("Mock API Call: createBooking", bookingData);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const {
    flight,
    passengers,
    seats,
    fareBundle,
    contactInfo,
    // paymentInfo, // Assuming payment is handled client-side or implicitly successful
  } = bookingData;

  // Generate mock booking reference
  const bookingReference = 'ONW' + Math.random().toString(36).substr(2, 6).toUpperCase();

  // Calculate total price based on provided data
  const baseFare = flight?.price || fareBundle?.price || 459; // Use flight price if available
  const seatCharges = seats.reduce((sum, seat) => sum + (seat.price || 0), 0);
  const taxesAndFees = Math.round(baseFare * 0.15); // Simple tax calculation
  const total = baseFare + seatCharges + taxesAndFees;

  return {
    success: true,
    bookingReference,
    status: 'confirmed',
    booking: {
      id: bookingReference,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      flight: {
        ...(flight || {}), // Include flight details passed in
        bookingClass: fareBundle?.name || 'Main',
      },
      passengers,
      seats, // Array of { id, price } objects
      pricing: {
        baseFare,
        seatCharges,
        taxesAndFees,
        total,
        currency: 'USD',
      },
      contactInfo,
      paymentStatus: 'completed', // Assume payment succeeded
      ticketNumbers: passengers.map(() =>
        'TKT' + Math.random().toString(36).substr(2, 10).toUpperCase()
      ),
    },
    message: 'Booking confirmed successfully!',
  };
};

/**
 * Fetch user's bookings (Mock)
 * @param {string} userId - Mock user ID (not used in this mock)
 * @returns {Promise<Object>} Mock object containing upcoming and past bookings
 */
export const fetchUserBookings = async (userId) => {
  console.log("Mock API Call: fetchUserBookings for user:", userId);
  await new Promise(resolve => setTimeout(resolve, 800));

  // Return static mock booking data
  return {
    upcoming: [
      {
        id: 'ONW7X3F9',
        bookingReference: 'ONW7X3F9',
        status: 'confirmed',
        airline: 'SkyWings',
        logo: '✈️',
        flightNumber: 'SW 4521',
        from: {
          city: 'New York',
          code: 'JFK',
          time: '08:30 AM',
          date: '2025-12-15T08:30:00Z', // Use ISO format for easier date handling
          terminal: '4',
        },
        to: {
          city: 'London',
          code: 'LHR',
          time: '08:45 PM',
          date: '2025-12-15T20:45:00Z', // Use ISO format
          terminal: '5',
        },
        seats: ['12A'],
        gate: 'B24',
        class: 'Main Cabin',
        passengers: ['John Doe'],
        bookingDate: '2025-11-20T10:00:00Z', // Use ISO format
      },
    ],
    past: [
      {
        id: 'ONW2M8K1',
        bookingReference: 'ONW2M8K1',
        status: 'completed',
        airline: 'Atlantic Air',
        logo: '🛫',
        flightNumber: 'AA 1832',
        from: { city: 'Los Angeles', code: 'LAX' },
        to: { city: 'Tokyo', code: 'NRT' },
        date: '2025-11-10T11:00:00Z', // Use ISO format
        class: 'Economy',
      },
      {
        id: 'ONW5P9L4',
        bookingReference: 'ONW5P9L4',
        status: 'completed',
        airline: 'EuroConnect',
        logo: '🌍',
        flightNumber: 'EC 7291',
        from: { city: 'Miami', code: 'MIA' },
        to: { city: 'Paris', code: 'CDG' },
        date: '2025-10-22T14:00:00Z', // Use ISO format
        class: 'Premium Economy',
      },
    ],
  };
};

/**
 * Get booking details by reference (Mock)
 * @param {string} bookingReference - Mock booking reference number
 * @returns {Promise<Object>} Mock booking details
 */
export const fetchBookingDetails = async (bookingReference) => {
  console.log("Mock API Call: fetchBookingDetails for ref:", bookingReference);
  await new Promise(resolve => setTimeout(resolve, 600));

  // Return static mock details, using the provided reference
  return {
    id: bookingReference,
    bookingReference,
    status: 'confirmed',
    createdAt: '2025-11-20T10:30:00Z',
    flight: {
      airline: 'SkyWings',
      flightNumber: 'SW 4521',
      departure: {
        airport: 'JFK',
        city: 'New York',
        time: '08:30 AM',
        date: '2025-12-15T08:30:00Z', // Use ISO format
        terminal: '4',
        gate: 'B24',
      },
      arrival: {
        airport: 'LHR',
        city: 'London',
        time: '08:45 PM',
        date: '2025-12-15T20:45:00Z', // Use ISO format
        terminal: '5',
      },
      duration: '7h 15m',
      bookingClass: 'Main',
    },
    passengers: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        dob: '1990-01-15', // Consistent date format
        ticketNumber: 'TKT8X7Y9Z1A2B3',
      },
    ],
    seats: [
      { id: '12A', type: 'premium', price: 45 },
    ],
    pricing: {
      baseFare: 459,
      seatCharges: 45,
      taxesAndFees: 89,
      total: 593,
      currency: 'USD',
    },
  };
};

/**
 * Cancel a booking (Mock)
 * @param {string} bookingReference - Mock booking reference to cancel
 * @returns {Promise<Object>} Mock cancellation confirmation
 */
export const cancelBooking = async (bookingReference) => {
  console.log("Mock API Call: cancelBooking for ref:", bookingReference);
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    success: true,
    bookingReference,
    status: 'cancelled',
    refundAmount: 500, // Example refund amount
    refundStatus: 'processing',
    refundDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Estimated refund date
    message: 'Booking cancelled successfully. Refund will be processed within 7-10 business days.',
  };
};

/**
 * Modify a booking (Mock)
 * @param {string} bookingReference - Mock booking reference to modify
 * @param {Object} modifications - Mock changes to apply
 * @returns {Promise<Object>} Mock modification confirmation
 */
export const modifyBooking = async (bookingReference, modifications) => {
  console.log("Mock API Call: modifyBooking for ref:", bookingReference, modifications);
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { newSeats, newFlight, addPassengers } = modifications;

  return {
    success: true,
    bookingReference,
    status: 'confirmed', // Assuming modification keeps it confirmed
    modifications: {
      seats: newSeats || [],
      flight: newFlight || null,
      passengers: addPassengers || [],
    },
    additionalCharge: 75, // Example charge
    message: 'Booking modified successfully.',
  };
};

/**
 * Download booking ticket/receipt (Mock)
 * @param {string} bookingReference - Mock booking reference
 * @param {string} format - 'pdf' | 'email'
 * @returns {Promise<Object>} Mock download/email confirmation
 */
export const downloadTicket = async (bookingReference, format = 'pdf') => {
  console.log(`Mock API Call: downloadTicket for ref: ${bookingReference}, format: ${format}`);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    bookingReference,
    format,
    // In a real app, this would be a secure, temporary URL
    downloadUrl: format === 'pdf'
      ? `/mock-api/bookings/${bookingReference}/ticket.pdf` // Example placeholder URL
      : null,
    emailSent: format === 'email',
    message: format === 'pdf'
      ? 'Ticket ready for download (mock URL)'
      : 'Ticket sent to your email (mock action)',
  };
};
