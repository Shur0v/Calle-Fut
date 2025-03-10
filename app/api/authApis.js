import axiosClient from "@/src/utils/axiosClient";
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const isBrowser = typeof window !== 'undefined';

/**
 * Authentication related API calls
 */
const AuthApis = {
    register: async (data) => {
        try {
            // Validate required fields
            if (!data.childs_name || !data.email || !data.password || !data.age || !data.phone_number) {
                return {
                    success: false,
                    message: 'All fields are required'
                };
            }

            // Log the request data for debugging
            console.log('Registration request data:', {
                childs_name: data.childs_name,
                email: data.email,
                age: data.age,
                phone_number: data.phone_number,
                password: '******' // Don't log actual password
            });

            // Make the API request
            const response = await axiosClient.post("/auth/register", {
                childs_name: data.childs_name,
                email: data.email,
                password: data.password,
                age: parseInt(data.age), // Ensure age is sent as a number
                phone_number: data.phone_number // Add phone number to request
            });

            // Log the response for debugging
            console.log('Registration API response:', {
                status: response.status,
                data: response.data
            });

            // Check if we have a valid response
            if (!response || !response.data) {
                throw new Error('Invalid response from server');
            }

            // Handle successful registration
            if (response.data.success) {
                // Store token if present in authorization object
                if (response.data.authorization?.token) {
                    const token = response.data.authorization.token;
                    const userType = response.data.type || 'user';

                    // Store in cookies
                    Cookies.set('token', token, { 
                        expires: 7, // 7 days
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Lax',
                        path: '/'
                    });
                    Cookies.set('userType', userType, { 
                        expires: 7,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Lax',
                        path: '/'
                    });

                    // Store in localStorage
                    localStorage.setItem('token', token);
                    localStorage.setItem('userType', userType);
                    localStorage.setItem('user', JSON.stringify({
                        email: data.email,
                        childs_name: data.childs_name,
                        type: userType
                    }));
                }
                return {
                    success: true,
                    data: response.data,
                    message: response.data.message || 'Registration successful'
                };
            }

            // Handle unsuccessful registration with server message
            return {
                success: false,
                message: response.data.message || 'Registration failed'
            };

        } catch (error) {
            console.error('Registration error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                data: error.response?.data
            });

            // Handle specific error cases
            if (error.response?.status === 400) {
                return {
                    success: false,
                    message: error.response.data?.message || 'Invalid registration data'
                };
            }

            if (error.response?.status === 409) {
                return {
                    success: false,
                    message: 'Email already exists. Please use a different email.'
                };
            }

            // Handle network errors
            if (error.message === 'Network Error') {
                return {
                    success: false,
                    message: 'Unable to connect to the server. Please check your internet connection.'
                };
            }

            // Handle any other errors
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Registration failed. Please try again.'
            };
        }
    },

    login: async (data) => {
        try {
            const response = await axiosClient.post("/auth/login", {
                email: data.email,
                password: data.password
            });

            // Check if response has the expected format
            if (response.data && response.data.success) {
                // Store token if present in authorization object and we're in browser
                if (response.data.authorization?.token && isBrowser) {
                    const token = response.data.authorization.token;
                    const userType = response.data.type || 'user';

                    // Store in cookies
                    Cookies.set('token', token, { 
                        expires: 7, // 7 days
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Lax',
                        path: '/'
                    });
                    Cookies.set('userType', userType, { 
                        expires: 7,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Lax',
                        path: '/'
                    });

                    // Store in localStorage
                    localStorage.setItem('token', token);
                    localStorage.setItem('userType', userType);
                    localStorage.setItem('user', JSON.stringify({
                        email: data.email,
                        type: userType
                    }));
                }
                return {
                    success: true,
                    data: response.data,
                    message: response.data.message || 'Login successful'
                };
            }
            
            return {
                success: false,
                message: response.data?.message || 'Login failed'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Invalid email or password'
            };
        }
    },

    logout: () => {
        if (!isBrowser) return;

        // Clear cookies
        Cookies.remove('token', { path: '/' });
        Cookies.remove('userType', { path: '/' });
        
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('user');

        // Show logout toast
        toast.success('Successfully logged out!');

        // Always redirect to home page
        window.location.href = '/';
    }
};

export default AuthApis;

