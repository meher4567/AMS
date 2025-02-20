import { apiRequest } from './api';

export const getTickets = async () => {
  return await apiRequest('get', '/api/tickets/');
};

export const createTicket = async (data) => {
  return await apiRequest('post', '/api/tickets/', data);
};

export const updateTicket = async (id, data) => {
  return await apiRequest('put', `/api/tickets/${id}/`, data);
};

export const deleteTicket = async (id) => {
  return await apiRequest('delete', `/api/tickets/${id}/`);
};


export const searchTickets = async (searchField, query) => {
  // Build the query string based on the search field
  const queryParam = `${searchField}_like=${encodeURIComponent(query)}`;
  
  // Send the request with the dynamic query parameter
  return await apiRequest('get', `/api/tickets?${queryParam}`);
};