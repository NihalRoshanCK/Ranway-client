import axios from 'axios';

const api = axios.create({
  // Set the base URL for your API requests
  baseURL: 'http://127.0.0.1:8000/',
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access');

    // If there is an access token, add it to the Authorization header
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the response status is 401 (Unauthorized) and there's a refresh token
    if (error.response && error.response.status === 401 && localStorage.getItem('refresh')) {
      try {
        // Send a request to the refresh token endpoint to get a new access token
        const refreshResponse = await axios.post('http://127.0.0.1:8000/auths/token/refresh/', {
          refresh: localStorage.getItem('refresh'),
        });

        // Update the access token in local storage and the original request headers
        localStorage.setItem('access', refreshResponse.data.access);
        originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.access}`;

        // Retry the original request with the new access token
        return api(originalRequest);
      } catch (refreshError) {
        // If refreshing the token fails, clear all tokens and redirect to login
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login'; // Redirect to login page
      }
    }

    // If there's no access token or the request is still unauthorized after token refresh, redirect to login
    if (!localStorage.getItem('access') || (error.response && error.response.status === 401)) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      window.location.href = '/login'; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

export default api;