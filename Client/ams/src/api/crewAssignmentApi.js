import { apiRequest } from './api';

// GET: Retrieve all crew assignments
export const getCrewAssignments = async () => {
  return await apiRequest('get', '/api/crewassignments/');
};

// POST: Create a new crew assignment
export const createCrewAssignment = async (data) => {
  return await apiRequest('post', '/api/crewassignments/', data);
};

// PUT: Update an existing crew assignment (assignment ID must be included in the URL)
export const updateCrewAssignment = async (id, data) => {
  return await apiRequest('put', `/api/crewassignments/${id}/`, data);
};

// DELETE: Delete a crew assignment (assignment ID must be included in the URL)
export const deleteCrewAssignment = async (id) => {
  return await apiRequest('delete', `/api/crewassignments/${id}/`);
};



export const searchCrewAssignments = async (searchField, query) => {
  // Build the query string based on the search field
  const queryParam = `${searchField}_like=${encodeURIComponent(query)}`;
  
  // Send the request with the dynamic query parameter
  return await apiRequest('get', `/api/crewassignments?${queryParam}`);
};