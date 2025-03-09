import axiosClient from "@/src/utils/axiosClient";

export const BookingRequestApis = {
    getBookingRequests: async () => {
        try {
            const response = await axiosClient.get("/admin/booking");
            
            // Log the response for debugging
            console.log('Raw Booking Requests API Response:', response);

            // Handle case where response.data is undefined or null
            if (!response.data) {
                throw new Error('No data received from server');
            }

            // The API returns data in response.data.data array
            const bookingsList = response.data.data || [];
            console.log('Booking Requests List:', bookingsList);

            // Transform the API response to match our needs
            const bookings = bookingsList.map(booking => ({
                id: booking.id || '',
                childName: booking.name || '',
                parentName: booking.parent_name || '',
                email: booking.email || '',
                age: booking.age ? `${booking.age} Years` : '',
                sessionDay: booking.session_time || '',
                status: booking.status || 'pending',
                additionalNotes: booking.additional_notes || null
            }));

            console.log('Transformed Booking Requests:', bookings);

            return {
                success: true,
                data: bookings
            };

        } catch (error) {
            console.error('Booking Requests API Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            let errorMessage = 'Failed to fetch booking requests';
            
            if (error.response) {
                errorMessage = error.response.data?.message || 
                             `Server error: ${error.response.status}`;
            } else if (error.request) {
                errorMessage = 'No response received from server';
            } else {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
                error: error.message
            };
        }
    },

    createBooking: async (bookingData) => {
        try {
            // Log the full request data and URL
            console.log('Create Booking - Full Request:', {
                url: '/api/booking',
                method: 'POST',
                data: {
                    ...bookingData,
                    password: '******'
                }
            });

            const response = await axiosClient.post("/booking", bookingData);
            
            // Log the full response
            console.log('Create Booking - Full Response:', {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                data: response.data
            });

            // Check if we have a valid response
            if (!response.data) {
                throw new Error('No data received from server');
            }

            // Check if the response indicates success
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data,
                    message: response.data.message || 'Booking created successfully'
                };
            } else {
                return {
                    success: false,
                    message: response.data.message || 'Failed to create booking',
                    error: response.data.error
                };
            }

        } catch (error) {
            // Enhanced error logging
            console.error('Create Booking - Detailed Error:', {
                message: error.message,
                response: {
                    data: error.response?.data,
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    headers: error.response?.headers
                },
                request: {
                    url: error.config?.url,
                    method: error.config?.method,
                    data: error.config?.data
                }
            });
            
            let errorMessage = 'Failed to create booking';
            
            if (error.response) {
                errorMessage = error.response.data?.message || 
                             `Server error: ${error.response.status} - ${error.response.statusText}`;
            } else if (error.request) {
                errorMessage = 'No response received from server. Please check your internet connection.';
            } else {
                errorMessage = `Error: ${error.message}`;
            }

            return {
                success: false,
                message: errorMessage,
                error: error.message
            };
        }
    },

    updateBookingStatus: async (bookingId, status) => {
        try {
            console.log('Update Booking Status - Request:', {
                endpoint: `/admin/booking/${bookingId}`,
                data: { status }
            });
            
            const response = await axiosClient.patch(`/admin/booking/${bookingId}`, {
                status: status
            });
            
            console.log('Update Booking Status - Response:', response);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            return {
                success: true,
                data: response.data,
                message: 'Booking status updated successfully'
            };

        } catch (error) {
            console.error('Update Booking Status - Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                endpoint: `/admin/booking/${bookingId}`
            });
            
            let errorMessage = 'Failed to update booking status';
            
            if (error.response) {
                errorMessage = error.response.data?.message || 
                             `Server error: ${error.response.status}`;
            } else if (error.request) {
                errorMessage = 'No response received from server';
            } else {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
                error: error.message
            };
        }
    }
};
