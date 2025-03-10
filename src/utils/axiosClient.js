import axios from "axios";
import Cookies from 'js-cookie';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://192.168.30.229:4000/api',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 10000, // 10 second timeout
  withCredentials: false // Disable credentials for CORS
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Log the request for debugging
    console.log('Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      baseURL: config.baseURL
    });

    // Get token from cookies
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject({
      success: false,
      message: 'Request failed'
    });
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Log the response for debugging
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    // Create a standardized error response
    const errorResponse = {
      success: false,
      message: 'An error occurred'
    };

    if (!error.response) {
      // Network error or server not reachable
      errorResponse.message = 'Unable to connect to the server. Please check your internet connection.';
      return Promise.reject(errorResponse);
    }

    if (error.response.status === 401) {
      errorResponse.message = 'Invalid email or password';
    } else if (error.response.data?.message) {
      errorResponse.message = error.response.data.message;
    } else if (error.response.status === 404) {
      errorResponse.message = 'Service not found';
    } else if (error.response.status >= 500) {
      errorResponse.message = 'Server error. Please try again later.';
    }

    return Promise.reject(errorResponse);
  }
);

export default axiosClient;