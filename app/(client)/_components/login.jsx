import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import logo from '@/public/client/logo.png';
import { useForm } from 'react-hook-form';
import AuthApis from '@/app/api/authApis';
import { toast } from 'react-hot-toast';

export default function Login({ onLoginSuccess }) {
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
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      
      // Prepare the data
      const data = {
        email: formData.email?.trim().toLowerCase(),
        password: formData.password
      };

      // Validate required fields
      if (!data.email || !data.password) {
        const missingFields = [];
        if (!data.email) missingFields.push('Email');
        if (!data.password) missingFields.push('Password');
        
        const errorMessage = `Please fill in all required fields: ${missingFields.join(', ')}`;
        toast.error(errorMessage);
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(data.email)) {
        toast.error('Please enter a valid email address');
        setLoading(false);
        return;
      }

      const response = await AuthApis.login(data);
      
      if (response.success) {
        // Only proceed if not admin type
        if (response.data?.type !== 'admin') {
          toast.success('Login successful! Welcome back.');
          reset();
          
          // Call the success callback to close modal
          if (onLoginSuccess) {
            onLoginSuccess();
          }
        } else {
          // Treat admin login attempt as invalid credentials
          toast.error('Invalid email or password');
          setLoading(false);
          return;
        }
      } else {
        // Show error message for wrong password/email
        toast.error(response.message || 'Invalid email or password');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Show user-friendly error message
      toast.error('Invalid email or password');
      setLoading(false);
    }
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="w-[676px] p-10 bg-white rounded-xl shadow-[0px_2px_42px_0px_rgba(0,0,0,0.05)] border border-[#ffefef] flex-col justify-start items-center gap-8 inline-flex">
      <div className="self-stretch flex-col justify-start items-start gap-12 flex">
        <div className="self-stretch flex-col justify-start items-center gap-10 flex">
          <div className="self-stretch flex-col justify-start items-center gap-3.5 flex">
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
            <div className="text-center text-[#070707] text-[40px] font-bold leading-10">Login Your Account</div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="self-stretch flex-col justify-start items-start gap-[18px] flex">
          {/* Email */}
          <div className="self-stretch flex-col justify-start items-start gap-3 flex">
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
          <div className="self-stretch flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch">
              <span className="text-[#1d1f2c] text-lg font-medium leading-[18px]">Password</span>
              <span className="text-[#b60000] text-lg font-medium leading-[18px]">*</span>
            </div>
            <div className="self-stretch relative">
              <input 
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
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

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className={`self-stretch h-11 px-[18px] py-[9px] bg-[#b60000] rounded-lg justify-center items-center gap-2.5 inline-flex hover:bg-[#990000] transition-colors duration-300 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="text-white text-lg font-medium leading-[18px]">
              {loading ? 'Logging in...' : 'Log in'}
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}
