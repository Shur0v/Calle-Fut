'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/public/client/logo.png';
import { useRouter } from 'next/navigation';
import AuthApis from '@/app/api/authApis';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Submitting login form:', formData);
      const response = await AuthApis.login(formData);
      console.log('Login response:', response);

      if (response.success) {
        console.log('Login successful, redirecting to dashboard...');
        // First set loading to false
        setLoading(false);
        // Then redirect
        window.location.href = '/dashboard';
      } else {
        setError(response.message || 'Invalid email or password');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login submission error:', error);
      setError(error?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-8">
      <div className="w-[594px] p-10 bg-white rounded-xl shadow-[0px_2px_42px_0px_rgba(0,0,0,0.05)] border border-[#ffefef] flex flex-col justify-start items-center gap-8">
        <div className="w-full flex flex-col justify-start items-start gap-8">
          <div className="w-full flex flex-col justify-start items-center gap-10">
            <div className="w-full flex flex-col justify-start items-center gap-3.5">
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
              <h1 className="text-center text-[#070707] text-[40px] font-bold leading-10">
                Login Your Dashboard
              </h1>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            {error && (
              <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            <div className="w-full flex flex-col gap-3">
              <label className="text-[#1d1f2c] text-lg font-medium leading-[18px]">
                Email
              </label>
              <div className="w-full p-4 rounded-lg border border-[#e9e9ea] flex items-center">
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full text-[#777980] text-sm font-normal leading-[14px] outline-none"
                  required
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <label className="text-[#1d1f2c] text-lg font-medium leading-[18px]">
                Password
              </label>
              <div className="w-full p-4 rounded-lg border border-[#e9e9ea] flex items-center">
                <input 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full text-[#777980] text-sm font-normal leading-[14px] outline-none"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className={`w-full h-11 px-[18px] py-[9px] bg-[#b60000] rounded-lg justify-center items-center gap-2.5 flex hover:bg-[#990000] transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="text-white text-lg font-medium leading-[18px]">
                {loading ? 'Logging in...' : 'Log in'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

