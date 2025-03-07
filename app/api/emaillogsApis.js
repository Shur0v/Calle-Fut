import axiosClient from "@/src/utils/axiosClient";

export const EmailLogsApis = {
    getEmailLogs: async () => {
        try {
            const response = await axiosClient.get("/admin/email-logs");
            
            // Log the response for debugging
            console.log('Raw Email Logs API Response:', response);

            // Handle case where response.data is undefined or null
            if (!response.data) {
                throw new Error('No data received from server');
            }

            // The API returns data in response.data.data array
            const emailLogsList = response.data.data || [];
            console.log('Email Logs List:', emailLogsList);

            // Transform the API response to match our needs
            const emailLogs = emailLogsList.map(log => ({
                id: log.id || '',
                name: log.name || '',
                email: log.email || '',
                subject: log.subject || '',
                message: log.message || '',
                status: log.status || '',
                date: log.created_at ? new Date(log.created_at).toLocaleDateString() : '',
                time: log.created_at ? new Date(log.created_at).toLocaleTimeString() : ''
            }));

            console.log('Transformed Email Logs:', emailLogs);

            return {
                success: true,
                data: emailLogs
            };

        } catch (error) {
            console.error('Email Logs API Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            let errorMessage = 'Failed to fetch email logs';
            
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
}
