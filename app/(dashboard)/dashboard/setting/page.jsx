"use client"
import React, { useRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import SettingApis from '@/app/api/settingApis'
import { toast } from 'react-hot-toast'
import { getUserData } from '@/app/api/settingApis'

// Function to compress image
const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Max dimensions
        const MAX_WIDTH = 800
        const MAX_HEIGHT = 800

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Get compressed image as base64 string
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7) // Adjust quality here (0.7 = 70% quality)
        resolve(compressedBase64)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  })
}

export default function Setting() {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [originalData, setOriginalData] = useState(null)
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const fileInputRef = useRef(null)
  const [userData, setUserData] = useState(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [defaultDateTime, setDefaultDateTime] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
    getValues
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '••••••••', // Default password (masked)
      profileImage: '',
      age: "5-7",
      sessionDateTime: '' // Start with empty string
    }
  })

  // Watch form values for showing/hiding save button
  const profileImage = watch('profileImage')
  const password = watch('password')

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const meData = await getUserData();
        setUserData(meData);
        
        // Set the initial image URL
        const imageUrl = meData?.avatar_url || 
            (meData?.avatar ? `${process.env.NEXT_PUBLIC_API_URL}/public/storage/avatar/${meData.avatar}` : null);
        setCurrentImageUrl(imageUrl || 'https://placehold.co/79x79');
        
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsDataLoaded(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    setIsClient(true);
    fetchUserData();
  }, []);

  // Set form values AFTER user data is loaded
  useEffect(() => {
    if (isClient && isDataLoaded) {
      const localUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      const initialData = {
        name: userData?.name || localUser?.name || 'Coach Marco',
        email: userData?.email || localUser?.email || 'marco@uta.com',
        password: '',
        profileImage: `${process.env.NEXT_PUBLIC_IMAGE_ENDPOINT}/public/storage/avatar/${userData.avatar}` || 'https://placehold.co/79x79'
      };
      
      setOriginalData(initialData);
      reset(initialData);
    }
  }, [reset, isClient, isDataLoaded, userData]);

  // Handle password field change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    if (newPassword !== '••••••••') {
      setIsPasswordChanged(true)
    } else {
      setIsPasswordChanged(false)
    }
    setValue('password', newPassword, { shouldDirty: true })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
        try {
            setIsLoading(true)
            toast.loading('Processing image...')

            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file')
                return
            }

            // Compress image
            const compressedImage = await compressImage(file)
            
            // Update form with compressed image
            setValue('profileImage', compressedImage, { shouldDirty: true })
            
            // Store the compressed image temporarily
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
            localStorage.setItem('user', JSON.stringify({
                ...currentUser,
                tempImage: compressedImage
            }))

            toast.dismiss()
            toast.success('Image processed successfully')
        } catch (error) {
            console.error('Image processing error:', error)
            toast.error('Failed to process image')
        } finally {
            setIsLoading(false)
        }
    }
  }

  const handleReplacePhoto = () => {
    fileInputRef.current?.click()
  }

  const handleRemovePhoto = async () => {
    try {
      setIsLoading(true);
      toast.loading('Removing photo...');

      // Comment out the API call
      // const response = await SettingApis.removeProfilePhoto();
      
      // Instead, just update local state and storage
      setCurrentImageUrl('https://placehold.co/79x79');
      setValue('profileImage', 'https://placehold.co/79x79', { shouldDirty: true });
      
      // Update local storage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      currentUser.avatar_url = 'https://placehold.co/79x79';
      delete currentUser.tempImage;
      localStorage.setItem('user', JSON.stringify(currentUser));
      
      // Trigger header update
      window.dispatchEvent(new CustomEvent('profileUpdated'));
      
      toast.success('Photo removed successfully');
    } catch (error) {
      console.error('Error removing photo:', error);
      toast.error('Failed to remove photo');
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  const onSubmit = async (data) => {
    try {
      if (isPasswordChanged && data.password.length < 8) {
        toast.error('Password must be at least 8 characters long')
        return
      }

      setIsLoading(true)
      
      const response = await SettingApis.updateProfile(data, originalData);
      
      if (response.success) {
        toast.success(response.message || 'Profile updated successfully');
        
        // Update the image URL from the response
        if (response.user?.avatar_url) {
            setCurrentImageUrl(response.user.avatar_url);
        }

        // Update form with fresh data and clear password
        const newData = {
            ...originalData,
            name: data.name,
            email: data.email,
            password: '', // Clear the password field
            profileImage: response.user?.avatar_url || originalData.profileImage
        };
        setOriginalData(newData);
        reset(newData);
        setIsPasswordChanged(false); // Reset password changed state

        // Trigger header update
        window.dispatchEvent(new CustomEvent('profileUpdated'));
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('An error occurred while updating profile');
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    if (originalData) {
      setIsPasswordChanged(false)
      reset(originalData)
    }
  }

  // Update the image display in the profile section
  const displayImage = watch('profileImage') || currentImageUrl;

  // Show loading indicator while fetching data
  if (!isClient || !isDataLoaded) {
    return <div className="w-full text-center py-8">Loading user data...</div>;
  }

  useEffect(() => {
    // Set the current datetime only after component mounts
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setDefaultDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
  }, []);

  const validateDateTime = (value) => {
    const selectedDate = new Date(value);
    const now = new Date();
    const selectedDateTime = selectedDate.getTime();
    const currentDateTime = now.getTime();
    const diff = selectedDateTime - currentDateTime;
    const oneHour = 1000 * 60 * 60;
    if (diff < 0 || diff > oneHour) {
      return "Session date and time must be within one hour from now";
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
      {/* Profile Section */}
      <div className="w-full p-6 bg-white rounded-xl flex items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="w-[79.46px] h-[79.46px] relative">
            <img 
              className="w-full h-full rounded-full border border-[#ff9292] object-cover" 
              src={displayImage}
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/79x79';
              }}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="absolute bottom-0 right-0">
              <div className="w-6 h-6 relative">
                <div className="w-6 h-6 bg-[#db0000] rounded-full" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.22322 7.1594C9.22322 6.23039 8.46988 5.47705 7.54087 5.47705C6.61186 5.47705 5.85852 6.23039 5.85852 7.1594C5.85852 8.08841 6.61186 8.84175 7.54087 8.84175C8.46988 8.84175 9.22322 8.08841 9.22322 7.1594Z" stroke="white" strokeWidth="0.781395" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.54135 11.2797C11.8446 11.2797 12.357 9.99034 12.357 7.19656C12.357 5.23832 12.098 4.19051 10.4669 3.74008C10.3171 3.69279 10.151 3.6027 10.0165 3.45462C9.79912 3.21646 9.64035 2.48508 9.1156 2.26381C8.59085 2.0431 6.48341 2.05323 5.9671 2.26381C5.45136 2.47494 5.28358 3.21646 5.06625 3.45462C4.93168 3.6027 4.76615 3.69279 4.61582 3.74008C2.9847 4.19051 2.72571 5.23832 2.72571 7.19656C2.72571 9.99034 3.23807 11.2797 7.54135 11.2797Z" stroke="white" strokeWidth="0.781395" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.1704 5.29137H10.1752" stroke="white" strokeWidth="0.837209" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="text-[#22262e] text-2xl font-semibold">{watch('name')}</div>
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={handleReplacePhoto}
                className="px-4 py-3 bg-[#b60000] rounded-lg flex items-center gap-1.5 hover:bg-[#a00000] transition-colors"
                disabled={isLoading}
              >
                <span className="text-white text-base font-medium">Replace Photo</span>
              </button>
              {displayImage !== 'https://placehold.co/79x79' && (
                <button 
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-4 py-3 bg-white border border-[#b60000] rounded-lg flex items-center gap-1.5 hover:bg-[#fff0f0] transition-colors"
                  disabled={isLoading}
                >
                  <span className="text-[#b60000] text-base font-medium">Remove Photo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-[#22262e] text-[32px] font-semibold">Settings</h1>
        </div>

        <div className="w-full p-6 bg-white rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#22262e] text-2xl font-medium">Account Settings</h2>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label className="text-[#4a4c56] text-base font-normal">Name</label>
              <input
                type="text"
                {...register("name", { 
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                className="p-5 rounded-lg border border-[#e5e1e1] text-[#777980] text-sm font-normal focus:outline-none focus:border-[#b60000] transition-colors"
                disabled={isLoading}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#4a4c56] text-base font-normal">Email</label>
              <input
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="p-5 rounded-lg border border-[#e5e1e1] text-[#777980] text-sm font-normal focus:outline-none focus:border-[#b60000] transition-colors"
                disabled={isLoading}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#4a4c56] text-base font-normal">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full p-5 rounded-lg border border-[#e5e1e1] text-[#777980] text-sm font-normal focus:outline-none focus:border-[#b60000] transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#4a4c56] text-base font-normal">Age</label>
              <input
                type="text"
                {...register("age", {
                  required: "Age is required",
                  pattern: {
                    value: /^[0-9]+-[0-9]+$/,
                    message: "Invalid age format. Use the format '5-7'"
                  }
                })}
                className={`w-full p-4 rounded-lg border ${
                  errors.age ? 'border-red-500' : 'border-[#e9e9ea]'
                } text-[#777980] text-sm font-normal leading-[14px]`}
              />
              {errors.age && (
                <span className="text-red-500 text-xs">{errors.age.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#4a4c56] text-base font-normal">Session Date and Time</label>
              <input
                type="datetime-local"
                {...register("sessionDateTime", {
                  required: "Session date and time is required",
                  validate: validateDateTime
                })}
                value={defaultDateTime}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setDefaultDateTime(newValue);
                  register("sessionDateTime").onChange(e);
                }}
                className={`w-full p-4 rounded-lg border ${
                  errors.sessionDateTime ? 'border-red-500' : 'border-[#e9e9ea]'
                } text-[#777980] text-sm font-normal leading-[14px]`}
              />
              {errors.sessionDateTime && (
                <span className="text-red-500 text-xs">{errors.sessionDateTime.message}</span>
              )}
            </div>
          </div>
        </div>

        {isDirty && (
          <div className="flex justify-end gap-4 mt-6">
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-[100px] h-12 px-[18px] py-3 bg-[#b60000] rounded-lg text-white font-medium hover:bg-[#a00000] transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button 
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className={`w-[100px] h-12 px-[18px] py-3 rounded-lg border border-[#db0000]/30 text-[#b60000] font-medium hover:bg-[#fff0f0] transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  )
}