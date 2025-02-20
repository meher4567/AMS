import { apiRequest } from './api';

export const getFlights = async () => {
  return await apiRequest('get', '/api/flights/');
};

export const createFlight = async (data) => {
  return await apiRequest('post', '/api/flights/', data);
};

export const updateFlight = async (id, data) => {
  return await apiRequest('put', `/api/flights/${id}/`, data);
};

export const deleteFlight = async (id) => {
  return await apiRequest('delete', `/api/flights/${id}/`);
};


export const searchFlights = async (searchField, query) => {
  // Build the query string based on the search field
  const queryParam = `${searchField}_like=${encodeURIComponent(query)}`;
  
  // Send the request with the dynamic query parameter
  return await apiRequest('get', `/api/flights?${queryParam}`);
};


export const assignCrewToFlight = async (data) => {
  return await apiRequest('post', '/api/assigncrew/', data);
};