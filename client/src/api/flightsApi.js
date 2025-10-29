// src/api/flightsApi.js

/**
 * ==========================================
 * Flights API - Mock & SerpApi Integration
 * ==========================================
 * Provides mock flight data and includes structure for real SerpApi calls.
 * Get your SerpApi key at: https://serpapi.com/
 */

// Mock data for development/testing when USE_MOCK_DATA is true
const mockFlights = [
  {
    id: 1,
    airline: 'SkyWings',
    logo: '✈️',
    flightNumber: 'SW 4521',
    departure: { time: '08:30 AM', airport: 'JFK', city: 'New York' },
    arrival: { time: '08:45 PM', airport: 'LHR', city: 'London' },
    duration: '7h 15m',
    stops: 'Non-stop',
    price: 459,
    amenities: ['wifi', 'meals', 'entertainment'],
    rating: 4.8,
    priceChange: 'down',
    carbonEmissions: 820,
  },
  {
    id: 2,
    airline: 'Atlantic Air',
    logo: '🛫',
    flightNumber: 'AA 1832',
    departure: { time: '11:00 AM', airport: 'JFK', city: 'New York' },
    arrival: { time: '11:30 PM', airport: 'LHR', city: 'London' },
    duration: '7h 30m',
    stops: 'Non-stop',
    price: 389,
    amenities: ['wifi', 'meals'],
    rating: 4.6,
    priceChange: 'down',
    carbonEmissions: 850,
  },
  {
    id: 3,
    airline: 'EuroConnect',
    logo: '🌍',
    flightNumber: 'EC 7291',
    departure: { time: '02:15 PM', airport: 'JFK', city: 'New York' },
    arrival: { time: '03:00 AM', airport: 'LHR', city: 'London' },
    duration: '8h 45m',
    stops: '1 stop (DUB)',
    price: 329,
    amenities: ['meals'],
    rating: 4.3,
    priceChange: 'up',
    carbonEmissions: 950,
  },
  {
    id: 4,
    airline: 'Premium Airways',
    logo: '💎',
    flightNumber: 'PA 6543',
    departure: { time: '06:00 PM', airport: 'JFK', city: 'New York' },
    arrival: { time: '06:15 AM', airport: 'LHR', city: 'London' },
    duration: '7h 15m',
    stops: 'Non-stop',
    price: 589,
    amenities: ['wifi', 'meals', 'entertainment', 'luxury'],
    rating: 4.9,
    priceChange: 'stable',
    carbonEmissions: 780,
  },
];

/**
 * Fetch flights using SerpApi Google Flights (or Mock Data)
 * @param {Object} params - Search parameters
 * @param {string} params.from - Departure airport code (e.g., 'JFK')
 * @param {string} params.to - Arrival airport code (e.g., 'LHR')
 * @param {string} params.date - Departure date (YYYY-MM-DD)
 * @param {string} [params.returnDate] - Return date for round trips (optional)
 * @param {number} [params.passengers=1] - Number of passengers
 * @returns {Promise<Array>} Array of flight objects in a consistent format
 */
export const fetchFlightsApi = async (params) => {
  const { from, to, date, returnDate, passengers = 1 } = params;

  // Toggle this to switch between mock data and actual API calls
  const USE_MOCK_DATA = true; // Set to false when SerpApi key is configured

  console.log(`Mock API Call: fetchFlightsApi (Mock Mode: ${USE_MOCK_DATA})`, params);

  if (USE_MOCK_DATA) {
    // Simulate API delay for mock data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a structured version of mock data, adjusting for passengers
    return mockFlights.map(flight => ({
      ...flight,
      // Ensure date consistency if needed, though mock data might already be specific
      departure: { ...flight.departure, date },
      arrival: { ...flight.arrival, date: returnDate || date }, // Simple date assignment for mock
      totalPrice: flight.price * passengers, // Calculate total based on passengers
    }));
  }

  // --- Production SerpApi Implementation ---
  try {
    // Securely get API key from environment variables
    const apiKey = process.env.REACT_APP_SERPAPI_KEY || 'YOUR_PLACEHOLDER_API_KEY';
    if (apiKey === 'YOUR_PLACEHOLDER_API_KEY') {
       console.warn("SerpApi key not configured. Using placeholder.");
       // Optionally fall back to mock data or throw an error
       // return []; // Or throw new Error("API Key missing");
    }

    const searchParams = new URLSearchParams({
      engine: 'google_flights',
      departure_id: from,
      arrival_id: to,
      outbound_date: date,
      currency: 'USD',
      hl: 'en',
      api_key: apiKey,
    });

    if (returnDate) {
      searchParams.append('return_date', returnDate);
    }

    // SerpApi defaults to 1 adult, add only if more
    if (passengers > 1) {
      searchParams.append('adults', passengers);
    }

    // Use a proxy or server-side endpoint in a real production app to hide the API key
    const url = `https://serpapi.com/search?${searchParams.toString()}`;
    console.log("Calling SerpApi:", url); // Log for debugging

    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("SerpApi Error Response:", errorBody);
      throw new Error(`SerpApi error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("SerpApi Success Response:", data);

    // --- Transform SerpApi response to our app's format ---
    const results = data.best_flights || data.other_flights || [];
    
    return results.map((flight, index) => {
      const firstLeg = flight.flights?.[0];
      const lastLeg = flight.flights?.[flight.flights.length - 1];
      
      return {
        id: flight.tracking_id || `${from}-${to}-${index}`, // Use a unique ID if available
        airline: firstLeg?.airline || 'Unknown Airline',
        logo: firstLeg?.airline_logo || '✈️', // Use logo if provided
        flightNumber: firstLeg?.flight_number || 'N/A',
        departure: {
          time: firstLeg?.departure_airport?.time || 'N/A',
          airport: firstLeg?.departure_airport?.id || from,
          city: firstLeg?.departure_airport?.name || from, // Extract city if possible
          date,
        },
        arrival: {
          time: lastLeg?.arrival_airport?.time || 'N/A',
          airport: lastLeg?.arrival_airport?.id || to,
          city: lastLeg?.arrival_airport?.name || to, // Extract city if possible
          // Adjust arrival date based on duration/overnight flights if possible from API
          date: returnDate || date,
        },
        duration: flight.total_duration || 'N/A',
        stops: flight.flights?.length > 1 ? `${flight.flights.length - 1} stop(s)` : 'Non-stop',
        // Extract layover info if needed: flight.layovers
        price: flight.price || 0, // Price per passenger
        amenities: ['wifi', 'meals'], // Mock amenities - SerpApi doesn't provide this directly
        rating: 4.5, // Mock rating
        priceChange: 'stable', // Mock price trend
        carbonEmissions: flight.carbon_emissions?.this_flight || null, // Get CO2 if available
        totalPrice: (flight.price || 0) * passengers,
      };
    });

  } catch (error) {
    console.error('Error fetching flights from SerpApi:', error);
    // Optionally return mock data as fallback on error
    // return mockFlights.map(f => ({ ...f, totalPrice: f.price * passengers }));
    throw new Error(error.message || 'Failed to fetch flights');
  }
};

/**
 * Fetch trending routes (Mock Data)
 * @returns {Promise<Array>} Array of trending route objects
 */
export const fetchTrendingRoutes = async () => {
  console.log("Mock API Call: fetchTrendingRoutes");
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { from: 'New York', to: 'London', price: '$459', code: 'JFK-LHR' },
    { from: 'Los Angeles', to: 'Tokyo', price: '$689', code: 'LAX-NRT' },
    { from: 'Miami', to: 'Paris', price: '$529', code: 'MIA-CDG' },
    { from: 'San Francisco', to: 'Singapore', price: '$799', code: 'SFO-SIN' },
    { from: 'Chicago', to: 'Dubai', price: '$649', code: 'ORD-DXB' },
    { from: 'Boston', to: 'Barcelona', price: '$479', code: 'BOS-BCN' },
  ];
};

// Note: No default export, use named imports:
// import { fetchFlightsApi, fetchTrendingRoutes } from './api/flightsApi';