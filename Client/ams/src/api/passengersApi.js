import { apiRequest } from './api';

// GET: Retrieve all passengers
export const getPassengers = async () => {
  return await apiRequest('get', '/api/passengers/');
};

// POST: Create a new passenger
export const createPassenger = async (data) => {
  return await apiRequest('post', '/api/passengers/', data); // Make sure to have `/api/passengers/`
};

// PUT: Update an existing passenger (passenger id must be included in the URL)
export const updatePassenger = async (id, data) => {
  return await apiRequest('put', `/api/passengers/${id}/`, data); // Added `/api/` prefix and closing slash `/`
};

// DELETE: Delete a passenger (passenger id must be included in the URL)
export const deletePassenger = async (id) => {
  return await apiRequest('delete', `/api/passengers/${id}/`); // Added `/api/` prefix and closing slash `/`
};


export const searchPassengers = async (searchField, query) => {
  // Build the query string based on the search field
  const queryParam = `${searchField}_like=${encodeURIComponent(query)}`;
  
  // Send the request with the dynamic query parameter
  return await apiRequest('get', `/api/passengers?${queryParam}`);
};