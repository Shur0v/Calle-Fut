import axiosClient from "@/src/utils/axiosClient";

const DashboardApis = {
    getDashboardData: async () => {
        try {
            const response = await axiosClient.get("/admin/dashboard");
            
            // Handle case where response.data is undefined or null
            if (!response.data) {
                throw new Error('No data received from server');
            }

            // Handle case where response.data.data is undefined or null
            const responseData = response.data.data || {};
            const studentsList = responseData.students || [];

            // Transform the API response to match our dashboard needs
            const students = studentsList.map(student => ({
                id: student.id || '',
                name: student.childs_name || '',
                // Ensure age has consistent format
                age: student.age ? `${student.age} Years` : '',
                email: student.email || '',
                joinDate: student.created_at ? new Date(student.created_at).toLocaleDateString() : '',
                time: student.created_at ? new Date(student.created_at).toLocaleTimeString() : '',
                status: student.status || 'inactive'
            }));

            // Calculate statistics from the response
            const activeStudents = students.filter(s => s.status.toLowerCase() === 'active').length;
            const totalStudents = students.length;

            const statistics = {
                totalStudents,
                activeStudents,
                inactiveStudents: totalStudents - activeStudents,
                totalBookingRequests: responseData.totalBookingRequests || 0
            };

            return {
                success: true,
                data: {
                    students,
                    ...statistics
                }
            };
        } catch (error) {
            console.error('Dashboard API Error:', error);
            
            // Handle different types of errors
            let errorMessage = 'Failed to fetch dashboard data';
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                errorMessage = error.response.data?.message || 
                             `Server error: ${error.response.status}`;
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = 'No response received from server';
            } else {
                // Something happened in setting up the request that triggered an Error
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

export default DashboardApis;