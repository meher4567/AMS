import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Point to json-server port (3000 or the correct one)
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiRequest = async (method, endpoint, data) => {
  try {
    const response = await api({ method, url: endpoint, data });
    return response.data;
  } catch (error) {
    console.error(`Error with ${method} request:`, error);
    throw error;
  }
};

export { apiRequest };
