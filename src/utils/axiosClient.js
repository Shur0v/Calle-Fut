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
    console.error('Request Error:', error);
    return Promise.reject(error);
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
    // Log the error for debugging
    console.error('Response Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });

    // Handle specific error cases
    if (error.response?.status === 401) {
      Cookies.remove('token');
      Cookies.remove('userType');
      window.location.href = '/admin-login';
      return Promise.reject(error);
    }

    // Handle network errors
    if (error.message === 'Network Error') {
      return Promise.reject({
        ...error,
        message: 'Unable to connect to the server. Please check your internet connection.'
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClient;