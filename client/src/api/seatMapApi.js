// src/api/seatMapApi.js

/**
 * ==========================================
 * Seat Map API - Mock Implementation
 * ==========================================
 * Simulates fetching seat map data for a flight.
 * Uses deterministic generation based on flightId for stability.
 */

// Simple hash function to get a number from flightId for deterministic randomness
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

/**
 * Generate mock seat map for a flight (Deterministic)
 * @param {string} flightId - The flight ID (e.g., "SW4521")
 * @returns {Promise<Object>} Seat map data with layout and metadata
 */
export const fetchSeatMapApi = async (flightId) => {
  console.log("Mock API Call: fetchSeatMapApi for flight:", flightId);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const rows = 25;
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  const layout = [];

  let availableCount = 0;
  let premiumCount = 0;
  let economyCount = 0;
  let occupiedCount = 0;

  const flightSeed = simpleHash(flightId); // Seed based on flight ID

  // Generate seat layout deterministically
  for (let row = 1; row <= rows; row++) {
    for (let col of columns) {
      const seatId = `${row}${col}`;
      const seatSeed = simpleHash(seatId + flightId); // Seed based on seat and flight

      // Determine seat type and price
      let type = 'economy';
      let price = 25;
      if (row <= 5 || row === 12 || row === 13) { // Premium/Exit rows
        type = 'premium';
        price = 45;
      }

      // Determine seat status (using seeded pseudo-randomness)
      let status = 'available';
      // More likely occupied towards back, less likely in premium
      const occupiedThreshold = (type === 'premium') ? 0.9 : (0.6 - row / 50);
      if ((seatSeed % 100) / 100 > occupiedThreshold) {
        status = 'occupied';
        occupiedCount++;
      } else {
        availableCount++;
        if (type === 'premium') {
          premiumCount++;
        } else {
          economyCount++;
        }
      }
      
      // Update status for consistency if it's available but typed as premium
      if (status === 'available' && type === 'premium') {
         status = 'premium'; // Available premium seats have 'premium' status
      }


      layout.push({
        id: seatId,
        row,
        column: col,
        status, // 'available' | 'premium' | 'occupied'
        type, // 'economy' | 'premium'
        price: (status === 'occupied') ? 0 : price, // No price for occupied seats
        position: columns.indexOf(col) < 3 ? 'left' : 'right',
        features: type === 'premium'
          ? ['Extra legroom', 'Priority boarding']
          : ['Standard seat'],
      });
    }
  }

  return {
    flightId,
    layout,
    metadata: {
      totalSeats: rows * columns.length,
      availableSeats: availableCount,
      premiumSeats: premiumCount, // Count of premium type seats (available or occupied)
      economySeats: economyCount, // Count of economy type seats (available or occupied)
      occupiedSeats: occupiedCount,
      rows,
      columns: columns.length,
      aisleAfterColumn: 'C',
    },
    pricing: {
      economy: 25,
      premium: 45, // Includes exit row for simplicity
    },
    aircraft: {
      type: 'Boeing 787-9 Dreamliner', // Example
      configuration: '3-3', // Mock config based on A-F
      wifi: (flightSeed % 2 === 0), // Deterministic wifi based on flightId
      entertainment: true,
    },
  };
};

/**
 * Update seat status (Mock)
 * @param {string} flightId - The flight ID
 * @param {Array<string>} seatIds - Array of seat IDs to update
 * @param {string} status - New status ('selected', 'occupied', 'available')
 * @returns {Promise<Object>} Mock confirmation of updated seats
 */
export const updateSeatStatus = async (flightId, seatIds, status) => {
  console.log(`Mock API Call: updateSeatStatus for ${flightId}, seats: ${seatIds}, status: ${status}`);
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real API, this would update the backend database
  return {
    success: true,
    flightId,
    updatedSeats: seatIds.map(id => ({
      id,
      status,
      timestamp: new Date().toISOString(),
    })),
  };
};

/**
 * Get seat recommendations based on preferences (Mock)
 * @param {string} flightId - The flight ID
 * @param {Object} [preferences={}] - User preferences (window, aisle, front, legroom)
 * @returns {Promise<Object>} Mock recommended seat IDs and reason
 */
export const getSeatRecommendations = async (flightId, preferences = {}) => {
  console.log("Mock API Call: getSeatRecommendations for flight:", flightId, preferences);
  await new Promise(resolve => setTimeout(resolve, 500));

  const {
    window = false,
    aisle = false,
    front = false,
    legroom = false
  } = preferences;

  // Mock recommendations based on simple preference logic
  const recommendations = [];
  let reason = 'Popular choices'; // Default reason

  // Very basic recommendation logic
  if (legroom) {
    recommendations.push('12A', '12F', '13C', '13D');
    reason = 'Exit row seats with extra legroom';
  } else if (front && window) {
    recommendations.push('3A', '3F', '4A', '4F');
    reason = 'Window seats near the front';
  } else if (front && aisle) {
    recommendations.push('3C', '3D', '4C', '4D');
     reason = 'Aisle seats near the front';
  } else if (window) {
    recommendations.push('10A', '10F', '15A', '15F');
    reason = 'Window seats with potential views';
  } else if (aisle) {
    recommendations.push('15C', '15D', '16C', '16D');
    reason = 'Aisle seats for easy access';
  }

  // Fallback if no specific preference matched strongly
  if (recommendations.length === 0) {
    recommendations.push('18C', '18D', '19C', '19D');
  }

  return {
    flightId,
    // Return unique recommendations, limited to 4-6
    recommendations: [...new Set(recommendations)].slice(0, 6),
    reason,
  };
};

// Note: No default export, use named imports:
// import { fetchSeatMapApi, updateSeatStatus, getSeatRecommendations } from './api/seatMapApi';