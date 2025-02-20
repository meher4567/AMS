import { apiRequest } from './api';

export const getCrewMembers = async () => {
  return await apiRequest('get', '/api/crew/');
};

export const createCrewMember = async (data) => {
  return await apiRequest('post', '/api/crew/', data);
};

export const updateCrewMember = async (id, data) => {
  return await apiRequest('put', `/api/crew/${id}/`, data);
};

export const deleteCrewMember = async (id) => {
  return await apiRequest('delete', `/api/crew/${id}/`);
};


export const searchCrewMembers = async (searchField, query) => {
  // Build the query string based on the search field
  const queryParam = `${searchField}_like=${encodeURIComponent(query)}`;
  
  // Send the request with the dynamic query parameter
  return await apiRequest('get', `/api/crew?${queryParam}`);
};