import axiosClient from "@/src/utils/axiosClient";
import { toast } from 'react-hot-toast';

const SettingApis = {
    updateProfile: async (data, originalData) => {
        try {
            const formData = new FormData();

            // Check each field and only include if it's different from original
            if (data.name?.trim() !== originalData.name) {
                formData.append('name', data.name?.trim());
            }

            if (data.email?.trim().toLowerCase() !== originalData.email?.toLowerCase()) {
                formData.append('email', data.email?.trim().toLowerCase());
            }

            // Only include password if it's provided and not the masked version
            if (data.password && data.password !== '••••••••') {
                formData.append('password', data.password);
            }

            // Handle image data
            if (data.profileImage?.startsWith('data:')) {
                // Convert base64 to blob
                const response = await fetch(data.profileImage);
                const blob = await response.blob();
                formData.append('image', blob, 'profile.jpg');
            }

            // If no fields have changed, return early
            if (formData.entries().next().done) {
                return {
                    success: true,
                    message: 'No changes to update'
                };
            }

            const response = await axiosClient.patch("/auth/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data && response.data.success) {
                const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
                
                // Construct the full avatar URL if avatar exists in response
                const avatarUrl = response.data.user?.avatar 
                    ? `${process.env.NEXT_PUBLIC_API_URL}/public/storage/avatar/${response.data.user.avatar}`
                    : currentUser.avatar_url;

                const updatedUser = {
                    ...currentUser,
                    ...response.data.user,
                    avatar_url: avatarUrl
                };

                localStorage.setItem('user', JSON.stringify(updatedUser));

                return {
                    success: true,
                    user: updatedUser,
                    data: response.data,
                    message: response.data.message || 'Profile updated successfully'
                };
            }
            
            return {
                success: false,
                message: response.data?.message || 'Failed to update profile'
            };
        } catch (error) {
            console.error('Profile update error:', error.response || error);
            
            // Handle specific error cases
            if (error.response?.status === 400) {
                return {
                    success: false,
                    message: error.response.data?.message || 'Invalid data provided'
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

            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to update profile'
            };
        }
    },

    // removeProfilePhoto: async () => {
    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/remove-avatar`, {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             },
    //         });
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error removing profile photo:', error);
    //         throw error;
    //     }
    // }
};



// Getting User Data

export const getUserData = async () => {
    try {
        const response = await axiosClient.get("/auth/me");
        if (response.data.success) {
            const userData = response.data.data;
            
            // Ensure we have a valid image URL
            const imageUrl = userData.avatar_url || 
                           (userData.avatar ? `${process.env.NEXT_PUBLIC_API_URL}/public/storage/avatar/${userData.avatar}` : null) ||
                           'https://placehold.co/79x79';
            
            const updatedUserData = {
                ...userData,
                image: imageUrl
            };
            
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            return updatedUserData;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};





export default SettingApis;