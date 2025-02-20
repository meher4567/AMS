import { apiRequest } from './api';

export const getBookings = async () => {
  return await apiRequest('get', '/api/bookings/');
};

export const createBooking = async (data) => {
  return await apiRequest('post', '/api/bookings/', data);
};

export const updateBooking = async (id, data) => {
  return await apiRequest('put', `/api/bookings/${id}/`, data);
};

export const deleteBooking = async (id) => {
  return await apiRequest('delete', `/api/bookings/${id}/`);
};

export const searchBookings = async (searchField, query) => {
  // Build the query string based on the search field
  const queryParam = `${searchField}_like=${encodeURIComponent(query)}`;
  
  // Send the request with the dynamic query parameter
  return await apiRequest('get', `/api/bookings?${queryParam}`);
};


export const getAllBookings = async (username) => {
  try {
    const endpoint = `/api/getbookings/${username}/`;
    const bookings = await apiRequest('get', endpoint);
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

