import { apiRequest } from './api';

export const getAirlines = async () => {
  return await apiRequest('get', '/api/airlines/');
};

export const createAirline = async (data) => {
  return await apiRequest('post', '/api/airlines/', data);
};

export const updateAirline = async (airline_id, data) => {
  return await apiRequest('put', `/api/airlines/${airline_id}/`, data);
};

export const deleteAirline = async (airline_id) => {
  return await apiRequest('delete', `/api/airlines/${airline_id}/`);
};

export const searchAirlines = async (searchField, query) => {
  // Build the query string based on the search field
  const queryParam = `${searchField}_like=${encodeURIComponent(query)}`;
  
  // Send the request with the dynamic query parameter
  return await apiRequest('get', `/api/airlines?${queryParam}`);
};



