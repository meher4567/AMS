import { apiRequest } from './api';

export const getAirports = async () => {
  return await apiRequest('get', '/api/airports/');
};

export const createAirport = async (data) => {
  return await apiRequest('post', '/api/airports/', data);
};

export const updateAirport = async (airport_code, data) => {
  return await apiRequest('put', `/api/airports/${airport_code}/`, data);
};

export const deleteAirport = async (airport_code) => {
  return await apiRequest('delete', `/api/airports/${airport_code}/`);
};


export const searchAirports = async (searchField, query) => {
  // Build the query string based on the search field
  const queryParam = `${searchField}_like=${encodeURIComponent(query)}`;
  
  // Send the request with the dynamic query parameter
  return await apiRequest('get', `/api/airports?${queryParam}`);
};
