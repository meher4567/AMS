import { apiRequest } from './api'; // Import the apiRequest function

export const getFlights = async (source = '', destination = '', startDate = '', endDate = '') => {
  try {
    // Construct query parameters only for non-empty values
    const queryParams = new URLSearchParams();
    if (source) queryParams.append('source', source);
    if (destination) queryParams.append('destination', destination);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);

    // Construct the URL with only the relevant query parameters
    const url = `/api/flightssearch/?${queryParams.toString()}`;

    // Use the apiRequest function to make the GET request
    const response = await apiRequest('get', url);

    // Return the enriched flight data from the backend
    return response;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
};
