import axiosClient from "@/src/utils/axiosClient";
import Cookies from 'js-cookie';

/**
 * Authentication related API calls
 */
const AuthApis = {
    login: async (data) => {
        try {
            console.log('Login request data:', data);
            const response = await axiosClient.post("/auth/login", {
                email: data.email,
                password: data.password
            });
            console.log('Login API response:', response);

            // Check if response has the expected format
            if (response.data && response.data.success) {
                // Store token if present in authorization object
                if (response.data.authorization?.token) {
                    Cookies.set('token', response.data.authorization.token, { 
                        expires: 7, // 7 days
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Lax'
                    });
                    Cookies.set('userType', response.data.type || 'admin', { 
                        expires: 7,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Lax'
                    });
                }
                return {
                    success: true,
                    data: response.data,
                    message: response.data.message || 'Login successful'
                };
            }
            return {
                success: false,
                message: response.data?.message || 'Invalid response from server'
            };
        } catch (error) {
            console.error('Login error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            // Handle network errors specifically
            if (error.message === 'Network Error') {
                return {
                    success: false,
                    message: 'Unable to connect to the server. Please check your internet connection.'
                };
            }

            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    },

    logout: () => {
        Cookies.remove('token');
        Cookies.remove('userType');
        window.location.href = '/admin-login';
    }
}

export default AuthApis;

