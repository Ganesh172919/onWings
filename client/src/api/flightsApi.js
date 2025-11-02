// src/api/flightsApi.js

import { flights, trendingRoutes, searchFlights as searchFlightsData } from '../data/mockData';

/**
 * Fetch flights using mock data
 * @param {Object} params - Search parameters
 * @param {string} params.from - Departure airport code (e.g., 'JFK')
 * @param {string} params.to - Arrival airport code (e.g., 'LHR')
 * @param {string} params.date - Departure date (YYYY-MM-DD)
 * @param {string} [params.returnDate] - Return date for round trips (optional)
 * @param {number} [params.passengers=1] - Number of passengers
 * @param {string} [params.stops] - Filter by stops ('nonstop', '1stop')
 * @param {Object} [params.priceRange] - Price range filter {min, max}
 * @param {Array} [params.airlines] - Filter by airline codes
 * @returns {Promise<Array>} Array of flight objects
 */
export const fetchFlightsApi = async (params) => {
  const { from, to, date, returnDate, passengers = 1, stops, priceRange, airlines } = params;

  console.log('Mock API Call: fetchFlightsApi', params);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Use the centralized search function
  const results = searchFlightsData({ from, to, date, passengers, stops, priceRange, airlines });

  // If no results, return empty array
  if (results.length === 0) {
    console.warn(`No flights found for ${from} to ${to}`);
    return [];
  }

  return results;
};

/**
 * Fetch trending routes (Mock Data)
 * @returns {Promise<Array>} Array of trending route objects
 */
export const fetchTrendingRoutes = async () => {
  console.log('Mock API Call: fetchTrendingRoutes');
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return trendingRoutes;
};

/**
 * Get all available flights (for general browsing)
 * @returns {Promise<Array>} Array of all flight objects
 */
export const getAllFlights = async () => {
  console.log('Mock API Call: getAllFlights');
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return flights;
};
