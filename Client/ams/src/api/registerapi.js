import { apiRequest } from './api';

// Sign In function (authenticate the user and retrieve token)
export const signIn = async (username, password) => {
    try {
        const response = await apiRequest('POST', '/api/signin/', { username, password });
        if (!response.token) {
            throw new Error('Invalid username or password');
        }
        // Save token to local storage or state management for future API requests
        localStorage.setItem('token', response.token);
        return response;  // Return the response with the token
    } catch (error) {
        throw error.message || 'Sign-in failed. Please try again.';
    }
};

// Sign Up function (registers a new user)
export const signUp = async (username, email, password) => {
    try {
        const response = await apiRequest('POST', '/api/signup/', { username, email, password });
        if (!response.token) {
            throw new Error('Sign-up failed');
        }
        // Optionally save the token or handle post-registration actions
        localStorage.setItem('token', response.token);
        return response;  // Return the created user data with the token
    } catch (error) {
        throw error.message || 'Sign-up failed. Please try again.';
    }
};

// Profile API function to fetch user details
export const getProfile = async (username) => {
    if (!username) throw new Error("Username is required to fetch profile");
  
    const endpoint = `api/profile/${username}/`;
    return await apiRequest('get', endpoint);
  };
  