import { apiRequest } from './api';

export const getPlanes = async () => {
  return await apiRequest('get', '/api/planes/');
};

export const createPlane = async (data) => {
  return await apiRequest('post', '/api/planes/', data);
};

export const updatePlane = async (id, data) => {
  return await apiRequest('put', `/api/planes/${id}/`, data);
};

export const deletePlane = async (id) => {
  return await apiRequest('delete', `/api/planes/${id}/`);
};


export const searchPlanes = async (searchField, query) => {
  // Build the query string based on the search field
  const queryParam = `${searchField}_like=${encodeURIComponent(query)}`;
  
  // Send the request with the dynamic query parameter
  return await apiRequest('get', `/api/planes?${queryParam}`);
};