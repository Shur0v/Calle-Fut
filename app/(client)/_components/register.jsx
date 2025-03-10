import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import logo from '@/public/client/logo.png';
import { useForm } from 'react-hook-form';
import AuthApis from '@/app/api/authApis';
import { toast } from 'react-hot-toast';

const ageOptions = ["5-7", "8-10", "11-13", "14-16", "17+"];

export default function Register({ onRegisterSuccess }) {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Handle client-side only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      age: "5-7"
    }
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      
      // Prepare the data
      const data = {
        childs_name: formData.childName?.trim(),
        email: formData.email?.trim().toLowerCase(),
        password: formData.password,
        age: formData.age.includes('-') 
          ? formData.age.split('-')[0].trim() 
          : formData.age.replace('+', '').trim(),
        phone_number: formData.phoneNumber?.trim().replace(/[^0-9]/g, '') || '' // Ensure it's never undefined
      };

      // Log form data for debugging
      console.log('Form data before submission:', {
        ...data,
        password: '******' // Don't log actual password
      });

      // Validate required fields
      if (!data.childs_name || !data.email || !data.password || !data.age || !data.phone_number) {
        const missingFields = [];
        if (!data.childs_name) missingFields.push('Child\'s name');
        if (!data.email) missingFields.push('Email');
        if (!data.password) missingFields.push('Password');
        if (!data.age) missingFields.push('Age');
        if (!data.phone_number) missingFields.push('Phone number');
        
        const errorMessage = `Please fill in all required fields: ${missingFields.join(', ')}`;
        toast.error(errorMessage);
        return;
      }

      // Validate email format
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(data.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

      // Validate phone number length (9-13 digits)
      const phoneDigits = data.phone_number.replace(/\D/g, '');
      if (phoneDigits.length < 9 || phoneDigits.length > 13) {
        toast.error('Phone number must be between 9 and 13 digits');
        return;
      }

      // Validate password length
      if (data.password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        return;
      }

      const response = await AuthApis.register(data);
      console.log('Registration API response:', response);
      
      if (response.success) {
        toast.success('Registration successful! Welcome to our academy.');
        reset();
        
        // Call the success callback
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }
      } else {
        // Show specific error message from server or fallback message
        const errorMessage = response.message || 'Registration failed. Please try again.';
        toast.error(errorMessage);
        
        // Log the error for debugging
        console.error('Registration failed:', {
          error: response.message,
          data: response.data
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      // Show more specific error message based on the error type
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message.includes('Network')) {
        toast.error('Unable to connect to the server. Please check your internet connection.');
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="w-[676px] h-auto p-10 bg-white rounded-xl shadow-[0px_2px_42px_0px_rgba(0,0,0,0.05)] border border-[#ffefef] flex-col justify-start items-center gap-8 inline-flex">
      <div className="self-stretch h-auto flex-col justify-start items-start gap-[18px] flex">
        <div className="self-stretch h-[198px] flex-col justify-start items-center gap-10 flex mb-8">
          <div className="self-stretch h-[198px] flex-col justify-start items-center gap-3.5 flex">
            <div className="w-20 h-20 relative">
              <div className="w-[35.02px] h-[34.29px] left-[22.12px] top-[22.12px] absolute bg-[#d9d9d9] rounded-full" />
              <Image 
                src={logo} 
                alt="Logo" 
                className="w-20 h-20 left-0 top-0 absolute" 
                width={80} 
                height={80}
                priority
              />
            </div>
            <div className="self-stretch flex-col justify-start items-center gap-4 flex">
              <div className="text-center text-[#070707] text-[40px] font-bold leading-10">Join Our Academy</div>
              <div className="w-[461.62px] text-center text-[#4a4c56] text-base font-normal leading-normal">
                Fill out this quick questionnaire to get your first training session for FREE.
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Child's Name */}
          <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex ">
            <div className="self-stretch">
              <span className="text-[#1d1f2c] text-lg font-medium leading-[18px]">Child's Name</span>
              <span className="text-[#b60000] text-lg font-medium leading-[18px]">*</span>
            </div>
            <div className="self-stretch relative">
              <input 
                {...register("childName", { 
                  required: "Child's name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                type="text"
                placeholder="Enter your child name"
                className={`w-full p-4 rounded-lg border ${errors.childName ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px] outline-none`}
              />
              {errors.childName && (
                <span className="text-red-500 text-xs mt-1">{errors.childName.message}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex mt-8">
            <div className="self-stretch">
              <span className="text-[#1d1f2c] text-lg font-medium leading-[18px]">Email</span>
              <span className="text-[#b60000] text-lg font-medium leading-[18px]">*</span>
            </div>
            <div className="self-stretch relative">
              <input 
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="Enter your email"
                className={`w-full p-4 rounded-lg border ${errors.email ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px] outline-none`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex mt-8">
            <div className="self-stretch">
              <span className="text-[#1d1f2c] text-lg font-medium leading-[18px]">Password</span>
              <span className="text-[#b60000] text-lg font-medium leading-[18px]">*</span>
            </div>
            <div className="self-stretch relative">
              <input 
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" }
                })}
                type="password"
                placeholder="Enter your password"
                className={`w-full p-4 rounded-lg border ${errors.password ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px] outline-none`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex mt-8">
            <div className="self-stretch">
              <span className="text-[#1d1f2c] text-lg font-medium leading-[18px]">Phone Number</span>
              <span className="text-[#b60000] text-lg font-medium leading-[18px]">*</span>
            </div>
            <div className="self-stretch relative">
              <input 
                {...register("phoneNumber", { 
                  required: "Phone number is required",
                  validate: {
                    validLength: (value) => {
                      const digits = value.replace(/\D/g, '');
                      return (digits.length >= 9 && digits.length <= 13) || 
                        "Phone number must be between 9 and 13 digits";
                    }
                  }
                })}
                type="tel"
                placeholder="Enter your phone number (9-13 digits)"
                maxLength={15}
                className={`w-full p-4 rounded-lg border ${errors.phoneNumber ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px] outline-none`}
              />
              
              {errors.phoneNumber && (
                <span className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</span>
              )}
            </div>
          </div>

          {/* Age */}
          <div className="self-stretch h-[82px] flex-col justify-start items-start gap-3 flex mt-8">
            <div className="self-stretch">
              <span className="text-[#1d1f2c] text-lg font-medium leading-[18px]">Age</span>
              <span className="text-[#b60000] text-lg font-medium leading-[18px]">*</span>
            </div>
            <div className="self-stretch relative">
              <select 
                {...register("age", { required: "Age is required" })}
                className={`w-full p-4 rounded-lg border ${errors.age ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px] appearance-none outline-none`}
                defaultValue="5-7"
              >
                {ageOptions.map((age) => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 7.50004C15 7.50004 11.3176 12.5 10 12.5C8.68233 12.5 5 7.5 5 7.5" stroke="#777980" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.age && (
                <span className="text-red-500 text-xs mt-1">{errors.age.message}</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className={`self-stretch h-11 px-[18px] py-[9px] bg-[#b60000] rounded-lg justify-center items-center gap-2.5 inline-flex hover:bg-[#990000] transition-colors duration-300 w-full mt-8 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="text-white text-lg font-medium leading-[18px]">
              {loading ? 'Registering...' : 'Register'}
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}
