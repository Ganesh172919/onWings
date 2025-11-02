// src/data/mockData.js

/**
 * ==========================================
 * Centralized Mock Data
 * ==========================================
 * Complete mock data for flights, airports, routes, and destinations
 */

// Major airports with coordinates for 3D map visualization
export const airports = [
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA', lat: 40.6413, lng: -73.7781, timezone: 'America/New_York' },
  { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK', lat: 51.4700, lng: -0.4543, timezone: 'Europe/London' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA', lat: 33.9416, lng: -118.4085, timezone: 'America/Los_Angeles' },
  { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan', lat: 35.7720, lng: 140.3929, timezone: 'Asia/Tokyo' },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France', lat: 49.0097, lng: 2.5479, timezone: 'Europe/Paris' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', lat: 25.2532, lng: 55.3657, timezone: 'Asia/Dubai' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore', lat: 1.3644, lng: 103.9915, timezone: 'Asia/Singapore' },
  { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia', lat: -33.9399, lng: 151.1753, timezone: 'Australia/Sydney' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'USA', lat: 25.7959, lng: -80.2870, timezone: 'America/New_York' },
  { code: 'ORD', name: 'Chicago O\'Hare', city: 'Chicago', country: 'USA', lat: 41.9742, lng: -87.9073, timezone: 'America/Chicago' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'USA', lat: 37.6213, lng: -122.3790, timezone: 'America/Los_Angeles' },
  { code: 'BOS', name: 'Logan International', city: 'Boston', country: 'USA', lat: 42.3656, lng: -71.0096, timezone: 'America/New_York' },
  { code: 'BCN', name: 'Barcelona-El Prat', city: 'Barcelona', country: 'Spain', lat: 41.2974, lng: 2.0833, timezone: 'Europe/Madrid' },
  { code: 'FCO', name: 'Leonardo da Vinci-Fiumicino', city: 'Rome', country: 'Italy', lat: 41.8003, lng: 12.2389, timezone: 'Europe/Rome' },
  { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan', lat: 35.5494, lng: 139.7798, timezone: 'Asia/Tokyo' },
  { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'South Korea', lat: 37.4602, lng: 126.4407, timezone: 'Asia/Seoul' },
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Netherlands', lat: 52.3105, lng: 4.7683, timezone: 'Europe/Amsterdam' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', lat: 50.0379, lng: 8.5622, timezone: 'Europe/Berlin' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'China', lat: 22.3080, lng: 113.9185, timezone: 'Asia/Hong_Kong' },
  { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey', lat: 41.2753, lng: 28.7519, timezone: 'Europe/Istanbul' },
  { code: 'DEN', name: 'Denver International', city: 'Denver', country: 'USA', lat: 39.8561, lng: -104.6737, timezone: 'America/Denver' },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta', country: 'USA', lat: 33.6407, lng: -84.4277, timezone: 'America/New_York' },
  { code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas', country: 'USA', lat: 36.0840, lng: -115.1537, timezone: 'America/Los_Angeles' },
  { code: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle', country: 'USA', lat: 47.4502, lng: -122.3088, timezone: 'America/Los_Angeles' },
];

// Airlines data
export const airlines = [
  { code: 'SW', name: 'SkyWings', logo: '✈️', rating: 4.8, color: '#2563EB' },
  { code: 'AA', name: 'Atlantic Air', logo: '🛫', rating: 4.6, color: '#3B82F6' },
  { code: 'EC', name: 'EuroConnect', logo: '🌍', rating: 4.3, color: '#6366F1' },
  { code: 'PA', name: 'Premium Airways', logo: '💎', rating: 4.9, color: '#8B5CF6' },
  { code: 'GA', name: 'Global Airways', logo: '🌐', rating: 4.7, color: '#06B6D4' },
  { code: 'OA', name: 'Ocean Air', logo: '🌊', rating: 4.5, color: '#0EA5E9' },
];

// Comprehensive flight data
export const flights = [
  {
    id: 1,
    airline: 'SkyWings',
    airlineCode: 'SW',
    logo: '✈️',
    flightNumber: 'SW 4521',
    departure: { time: '08:30 AM', airport: 'JFK', city: 'New York', terminal: '4', gate: 'B24' },
    arrival: { time: '08:45 PM', airport: 'LHR', city: 'London', terminal: '5', gate: 'A12' },
    duration: '7h 15m',
    stops: 'Non-stop',
    price: 459,
    amenities: ['wifi', 'meals', 'entertainment'],
    rating: 4.8,
    priceChange: 'down',
    carbonEmissions: 820,
    aircraft: 'Boeing 787-9',
    availableSeats: 45,
  },
  {
    id: 2,
    airline: 'Atlantic Air',
    airlineCode: 'AA',
    logo: '🛫',
    flightNumber: 'AA 1832',
    departure: { time: '11:00 AM', airport: 'JFK', city: 'New York', terminal: '4', gate: 'C15' },
    arrival: { time: '11:30 PM', airport: 'LHR', city: 'London', terminal: '3', gate: 'B8' },
    duration: '7h 30m',
    stops: 'Non-stop',
    price: 389,
    amenities: ['wifi', 'meals'],
    rating: 4.6,
    priceChange: 'down',
    carbonEmissions: 850,
    aircraft: 'Airbus A350',
    availableSeats: 72,
  },
  {
    id: 3,
    airline: 'EuroConnect',
    airlineCode: 'EC',
    logo: '🌍',
    flightNumber: 'EC 7291',
    departure: { time: '02:15 PM', airport: 'JFK', city: 'New York', terminal: '1', gate: 'D9' },
    arrival: { time: '03:00 AM', airport: 'LHR', city: 'London', terminal: '2', gate: 'C5' },
    duration: '8h 45m',
    stops: '1 stop (DUB)',
    price: 329,
    amenities: ['meals'],
    rating: 4.3,
    priceChange: 'up',
    carbonEmissions: 950,
    aircraft: 'Boeing 737-800',
    availableSeats: 28,
  },
  {
    id: 4,
    airline: 'Premium Airways',
    airlineCode: 'PA',
    logo: '💎',
    flightNumber: 'PA 6543',
    departure: { time: '06:00 PM', airport: 'JFK', city: 'New York', terminal: '8', gate: 'A1' },
    arrival: { time: '06:15 AM', airport: 'LHR', city: 'London', terminal: '5', gate: 'A20' },
    duration: '7h 15m',
    stops: 'Non-stop',
    price: 589,
    amenities: ['wifi', 'meals', 'entertainment', 'luxury'],
    rating: 4.9,
    priceChange: 'stable',
    carbonEmissions: 780,
    aircraft: 'Boeing 787-10',
    availableSeats: 18,
  },
  // LA to Tokyo
  {
    id: 5,
    airline: 'Global Airways',
    airlineCode: 'GA',
    logo: '🌐',
    flightNumber: 'GA 2341',
    departure: { time: '10:30 AM', airport: 'LAX', city: 'Los Angeles', terminal: 'B', gate: 'G12' },
    arrival: { time: '03:45 PM', airport: 'NRT', city: 'Tokyo', terminal: '1', gate: 'S8' },
    duration: '11h 15m',
    stops: 'Non-stop',
    price: 689,
    amenities: ['wifi', 'meals', 'entertainment'],
    rating: 4.7,
    priceChange: 'stable',
    carbonEmissions: 1250,
    aircraft: 'Boeing 777-300ER',
    availableSeats: 56,
  },
  // Miami to Paris
  {
    id: 6,
    airline: 'Ocean Air',
    airlineCode: 'OA',
    logo: '🌊',
    flightNumber: 'OA 8721',
    departure: { time: '07:45 PM', airport: 'MIA', city: 'Miami', terminal: 'N', gate: 'D7' },
    arrival: { time: '10:30 AM', airport: 'CDG', city: 'Paris', terminal: '2E', gate: 'K24' },
    duration: '8h 45m',
    stops: 'Non-stop',
    price: 529,
    amenities: ['wifi', 'meals', 'entertainment'],
    rating: 4.5,
    priceChange: 'down',
    carbonEmissions: 920,
    aircraft: 'Airbus A330-300',
    availableSeats: 63,
  },
  // San Francisco to Singapore
  {
    id: 7,
    airline: 'SkyWings',
    airlineCode: 'SW',
    logo: '✈️',
    flightNumber: 'SW 9923',
    departure: { time: '11:15 PM', airport: 'SFO', city: 'San Francisco', terminal: 'I', gate: 'A9' },
    arrival: { time: '07:30 AM', airport: 'SIN', city: 'Singapore', terminal: '3', gate: 'B15' },
    duration: '16h 15m',
    stops: 'Non-stop',
    price: 799,
    amenities: ['wifi', 'meals', 'entertainment', 'luxury'],
    rating: 4.8,
    priceChange: 'stable',
    carbonEmissions: 1580,
    aircraft: 'Airbus A350-900',
    availableSeats: 42,
  },
  // Chicago to Dubai
  {
    id: 8,
    airline: 'Premium Airways',
    airlineCode: 'PA',
    logo: '💎',
    flightNumber: 'PA 1156',
    departure: { time: '09:20 AM', airport: 'ORD', city: 'Chicago', terminal: '5', gate: 'M14' },
    arrival: { time: '06:45 AM', airport: 'DXB', city: 'Dubai', terminal: '3', gate: 'A22' },
    duration: '13h 25m',
    stops: 'Non-stop',
    price: 649,
    amenities: ['wifi', 'meals', 'entertainment', 'luxury'],
    rating: 4.9,
    priceChange: 'up',
    carbonEmissions: 1420,
    aircraft: 'Boeing 777-200LR',
    availableSeats: 31,
  },
  // Boston to Barcelona
  {
    id: 9,
    airline: 'Atlantic Air',
    airlineCode: 'AA',
    logo: '🛫',
    flightNumber: 'AA 4487',
    departure: { time: '05:30 PM', airport: 'BOS', city: 'Boston', terminal: 'E', gate: 'E10' },
    arrival: { time: '06:15 AM', airport: 'BCN', city: 'Barcelona', terminal: '1', gate: 'B42' },
    duration: '7h 45m',
    stops: 'Non-stop',
    price: 479,
    amenities: ['wifi', 'meals', 'entertainment'],
    rating: 4.6,
    priceChange: 'down',
    carbonEmissions: 880,
    aircraft: 'Airbus A330-200',
    availableSeats: 51,
  },
];

// Trending routes with flight paths
export const trendingRoutes = [
  { 
    id: 1,
    from: { code: 'JFK', city: 'New York', country: 'USA', lat: 40.6413, lng: -73.7781 },
    to: { code: 'LHR', city: 'London', country: 'UK', lat: 51.4700, lng: -0.4543 },
    price: '$459',
    code: 'JFK-LHR',
    savings: '15%',
    popularity: 95,
    flightCount: 45,
  },
  { 
    id: 2,
    from: { code: 'LAX', city: 'Los Angeles', country: 'USA', lat: 33.9416, lng: -118.4085 },
    to: { code: 'NRT', city: 'Tokyo', country: 'Japan', lat: 35.7720, lng: 140.3929 },
    price: '$689',
    code: 'LAX-NRT',
    savings: '12%',
    popularity: 88,
    flightCount: 32,
  },
  { 
    id: 3,
    from: { code: 'MIA', city: 'Miami', country: 'USA', lat: 25.7959, lng: -80.2870 },
    to: { code: 'CDG', city: 'Paris', country: 'France', lat: 49.0097, lng: 2.5479 },
    price: '$529',
    code: 'MIA-CDG',
    savings: '18%',
    popularity: 82,
    flightCount: 28,
  },
  { 
    id: 4,
    from: { code: 'SFO', city: 'San Francisco', country: 'USA', lat: 37.6213, lng: -122.3790 },
    to: { code: 'SIN', city: 'Singapore', country: 'Singapore', lat: 1.3644, lng: 103.9915 },
    price: '$799',
    code: 'SFO-SIN',
    savings: '10%',
    popularity: 79,
    flightCount: 18,
  },
  { 
    id: 5,
    from: { code: 'ORD', city: 'Chicago', country: 'USA', lat: 41.9742, lng: -87.9073 },
    to: { code: 'DXB', city: 'Dubai', country: 'UAE', lat: 25.2532, lng: 55.3657 },
    price: '$649',
    code: 'ORD-DXB',
    savings: '8%',
    popularity: 76,
    flightCount: 15,
  },
  { 
    id: 6,
    from: { code: 'BOS', city: 'Boston', country: 'USA', lat: 42.3656, lng: -71.0096 },
    to: { code: 'BCN', city: 'Barcelona', country: 'Spain', lat: 41.2974, lng: 2.0833 },
    price: '$479',
    code: 'BOS-BCN',
    savings: '20%',
    popularity: 74,
    flightCount: 22,
  },
];

// Popular destinations
export const popularDestinations = [
  { code: 'LHR', city: 'London', country: 'UK', image: '🇬🇧', avgPrice: '$459', description: 'Historic landmarks & culture', popularity: 95 },
  { code: 'NRT', city: 'Tokyo', country: 'Japan', image: '🇯🇵', avgPrice: '$689', description: 'Modern metropolis meets tradition', popularity: 88 },
  { code: 'CDG', city: 'Paris', country: 'France', image: '🇫🇷', avgPrice: '$529', description: 'City of lights & romance', popularity: 92 },
  { code: 'DXB', city: 'Dubai', country: 'UAE', image: '🇦🇪', avgPrice: '$649', description: 'Luxury & innovation', popularity: 85 },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', image: '🇸🇬', avgPrice: '$799', description: 'Garden city & culinary paradise', popularity: 83 },
  { code: 'BCN', city: 'Barcelona', country: 'Spain', image: '🇪🇸', avgPrice: '$479', description: 'Art, architecture & beaches', popularity: 81 },
  { code: 'SYD', city: 'Sydney', country: 'Australia', image: '🇦🇺', avgPrice: '$1,089', description: 'Iconic harbor & beaches', popularity: 78 },
  { code: 'FCO', city: 'Rome', country: 'Italy', image: '🇮🇹', avgPrice: '$549', description: 'Ancient history & cuisine', popularity: 89 },
];

// Fare bundles
export const fareBundles = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    priceLabel: 'Included',
    color: '#6366F1',
    features: [
      { name: 'Personal item', included: true },
      { name: 'Carry-on bag', included: false },
      { name: 'Checked bag', included: false },
      { name: 'Seat selection', included: false },
      { name: 'Changes', included: false, detail: 'Fee applies' },
      { name: 'Cancellation', included: false, detail: 'Non-refundable' },
    ],
  },
  {
    id: 'main',
    name: 'Main',
    price: 75,
    priceLabel: '+$75',
    color: '#2563EB',
    popular: true,
    features: [
      { name: 'Personal item', included: true },
      { name: 'Carry-on bag', included: true },
      { name: 'Checked bag', included: true, detail: '1 bag' },
      { name: 'Seat selection', included: true, detail: 'Standard seats' },
      { name: 'Changes', included: true, detail: 'Fee applies' },
      { name: 'Cancellation', included: false, detail: 'Partial refund' },
      { name: 'Priority boarding', included: true },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: 250,
    priceLabel: '+$250',
    color: '#FACC15',
    features: [
      { name: 'Personal item', included: true },
      { name: 'Carry-on bag', included: true },
      { name: 'Checked bag', included: true, detail: '2 bags' },
      { name: 'Seat selection', included: true, detail: 'Premium seats' },
      { name: 'Changes', included: true, detail: 'Free changes' },
      { name: 'Cancellation', included: true, detail: 'Full refund' },
      { name: 'Priority boarding', included: true },
      { name: 'Lounge access', included: true },
      { name: 'Extra legroom', included: true },
    ],
  },
];

// Helper function to get airport by code
export const getAirportByCode = (code) => {
  return airports.find(airport => airport.code === code);
};

// Helper function to get flights between two airports
export const getFlightsBetween = (fromCode, toCode) => {
  return flights.filter(
    flight => flight.departure.airport === fromCode && flight.arrival.airport === toCode
  );
};

// Helper function to search flights
export const searchFlights = (params) => {
  const { from, to, date, passengers = 1, stops, priceRange, airlines: selectedAirlines } = params;
  
  let results = flights.filter(
    flight => flight.departure.airport === from && flight.arrival.airport === to
  );

  // Filter by stops
  if (stops) {
    if (stops === 'nonstop') {
      results = results.filter(f => f.stops === 'Non-stop');
    } else if (stops === '1stop') {
      results = results.filter(f => f.stops.includes('1 stop'));
    }
  }

  // Filter by price range
  if (priceRange) {
    results = results.filter(f => f.price >= priceRange.min && f.price <= priceRange.max);
  }

  // Filter by airlines
  if (selectedAirlines && selectedAirlines.length > 0) {
    results = results.filter(f => selectedAirlines.includes(f.airlineCode));
  }

  // Add date and passenger info
  return results.map(flight => ({
    ...flight,
    departure: { ...flight.departure, date },
    totalPrice: flight.price * passengers,
  }));
};
