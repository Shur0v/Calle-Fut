import axiosClient from "@/src/utils/axiosClient";

export const StudentApis = {
    getStudents: async () => {
        try {
            const response = await axiosClient.get("/admin/students");
            
            // Log the response for debugging
            console.log('Raw API Response:', response);

            // Handle case where response.data is undefined or null
            if (!response.data) {
                throw new Error('No data received from server');
            }

            // The API returns data in response.data.data array
            const studentsList = response.data.data || [];
            console.log('Students List:', studentsList);

            // Transform the API response to match our dashboard needs
            const students = studentsList.map(student => ({
                id: student.id || '',
                name: student.childs_name || '',
                age: student.age || '',
                email: student.email || '',
                joinDate: student.created_at ? new Date(student.created_at).toLocaleDateString() : '',
                time: student.created_at ? new Date(student.created_at).toLocaleTimeString() : '',
                status: student.status || 'inactive'
            }));

            console.log('Transformed Students:', students);

            // Calculate statistics
            const activeStudents = students.filter(s => s.status.toLowerCase() === 'active').length;
            const totalStudents = students.length;

            return {
                success: true,
                data: {
                    students,
                    statistics: {
                        totalStudents,
                        activeStudents,
                        inactiveStudents: totalStudents - activeStudents
                    }
                }
            };

        } catch (error) {
            console.error('Students API Error:', error);
            
            let errorMessage = 'Failed to fetch students data';
            
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

    getStudentById: async (studentId) => {
        try {
            console.log('Get Student - Request:', {
                endpoint: `/admin/students/${studentId}`
            });

            const response = await axiosClient.get(`/admin/students/${studentId}`);
            console.log('Get Student - Response:', response);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            const student = response.data.data;
            // Transform the student data to match our needs
            const transformedStudent = {
                id: student.id || '',
                name: student.childs_name || '',
                age: student.age || '',
                email: student.email || '',
                joinDate: student.created_at ? new Date(student.created_at).toLocaleDateString() : '',
                time: student.created_at ? new Date(student.created_at).toLocaleTimeString() : '',
                status: student.status || 'inactive'
            };

            return {
                success: true,
                data: transformedStudent
            };

        } catch (error) {
            console.error('Get Student - Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                endpoint: `/admin/students/${studentId}`
            });
            
            let errorMessage = 'Failed to fetch student';
            
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

    updateStudent: async (studentId, updatedData) => {
        try {
            // Transform the data to match API expectations
            const apiData = {
                childs_name: updatedData.name,
                age: updatedData.age,
                email: updatedData.email,
                status: updatedData.status
            };

            console.log('Update Student - Request:', {
                endpoint: `/admin/students/${studentId}`,
                data: apiData
            });
            
            const response = await axiosClient.patch(`/admin/students/${studentId}`, apiData);
            console.log('Update Student - Response:', response);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            return {
                success: true,
                data: response.data
            };

        } catch (error) {
            console.error('Update Student - Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                endpoint: `/admin/students/${studentId}`
            });
            
            let errorMessage = 'Failed to update student';
            
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

    deleteStudent: async (studentId) => {
        try {
            console.log('Delete Student - Request:', {
                endpoint: `/admin/students/${studentId}`
            });

            const response = await axiosClient.delete(`/admin/students/${studentId}`);
            console.log('Delete Student - Response:', response);
            
            return {
                success: true,
                message: 'Student deleted successfully'
            };

        } catch (error) {
            console.error('Delete Student - Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                endpoint: `/admin/students/${studentId}`
            });
            
            let errorMessage = 'Failed to delete student';
            
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