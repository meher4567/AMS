import { apiRequest } from './api';

const createbookingsapi = async (bookingData) => {
  try {
    // POST request to create bookings
    const response = await apiRequest('post', '/api/createbooking/', bookingData);
    return response; // Returns response from the backend
  } catch (error) {
    console.error('Error in createbookingsapi:', error);
    throw error;
  }
};

export { createbookingsapi };
