import axiosClient from "@/src/utils/axiosClient";

export const EmailTemplateApis = {
    getEmailTemplates: async () => {
        try {
            const response = await axiosClient.get("/admin/email-templates");
            
            // Log the response for debugging
            console.log('Raw Email Templates API Response:', response);

            // Handle case where response.data is undefined or null
            if (!response.data) {
                throw new Error('No data received from server');
            }

            // The API returns data in response.data.data array
            const templatesList = response.data.data || [];
            console.log('Email Templates List:', templatesList);

            // Transform the API response to match our needs
            const templates = templatesList.map(template => ({
                id: template.id || '',
                templateName: template.name || '',
                subject: template.subject || '',
                message: template.message || '',
                date: template.created_at ? new Date(template.created_at).toLocaleDateString() : '',
                status: template.status || 1
            }));

            console.log('Transformed Email Templates:', templates);

            return {
                success: true,
                data: templates
            };

        } catch (error) {
            console.error('Email Templates API Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            let errorMessage = 'Failed to fetch email templates';
            
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

    createEmailTemplate: async (templateData) => {
        try {
            console.log('Create Email Template - Request:', templateData);
            
            const response = await axiosClient.post("/admin/email-templates", templateData);
            console.log('Create Email Template - Response:', response);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            return {
                success: true,
                data: response.data,
                message: 'Email template created successfully'
            };

        } catch (error) {
            console.error('Create Email Template Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            let errorMessage = 'Failed to create email template';
            
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

    updateEmailTemplate: async (templateId, templateData) => {
        try {
            console.log('Update Email Template - Request:', {
                templateId,
                data: templateData
            });
            
            const response = await axiosClient.patch(`/admin/email-templates/${templateId}`, templateData);
            console.log('Update Email Template - Response:', response);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            return {
                success: true,
                data: response.data,
                message: 'Email template updated successfully'
            };

        } catch (error) {
            console.error('Update Email Template Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            let errorMessage = 'Failed to update email template';
            
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

    deleteEmailTemplate: async (templateId) => {
        try {
            console.log('Delete Email Template - Request:', { templateId });
            
            const response = await axiosClient.delete(`/admin/email-templates/${templateId}`);
            console.log('Delete Email Template - Response:', response);

            return {
                success: true,
                message: 'Email template deleted successfully'
            };

        } catch (error) {
            console.error('Delete Email Template Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            let errorMessage = 'Failed to delete email template';
            
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
