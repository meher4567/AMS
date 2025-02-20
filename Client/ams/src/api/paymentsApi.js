import { apiRequest } from './api';

export const getPayments = async () => {
  return await apiRequest('get', '/api/payments/');
};

export const createPayment = async (data) => {
  return await apiRequest('post', '/api/payments/', data);
};

export const updatePayment = async (id, data) => {
  return await apiRequest('put', `/api/payments/${id}/`, data);
};

export const deletePayment = async (id) => {
  return await apiRequest('delete', `/api/payments/${id}/`);
};

export const searchPayments = async (searchField, query) => {
  // Build the query string based on the search field
  const queryParam = `${searchField}_like=${encodeURIComponent(query)}`;
  
  // Send the request with the dynamic query parameter
  return await apiRequest('get', `/api/payments?${queryParam}`);
};