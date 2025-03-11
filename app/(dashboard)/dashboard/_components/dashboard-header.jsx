'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import search from '@/public/dashboard/icon/search.svg';
import avatar from '@/public/dashboard/icon/avatar.png';
import Sidebar from './sidebar';
import { getUserData } from '@/app/api/settingApis';

export default function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState({
    name: 'Coach Marco',
    image: avatar.src
  });
  const [isOpen, setIsOpen] = useState(false);

  const fetchAndUpdateUserData = async () => {
    try {
      const apiData = await getUserData();
      if (apiData) {
        const updatedData = {
          name: apiData.name || 'Coach Marco',
          image: apiData.avatar_url || 'https://placehold.co/40x40'
        };
        setUserData(updatedData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      const localUser = JSON.parse(localStorage.getItem('user') || '{}');
      setUserData({
        name: localUser.name || 'Coach Marco',
        image: localUser.avatar_url || 'https://placehold.co/40x40'
      });
    }
  };

  useEffect(() => {
    // Fetch data when component mounts
    fetchAndUpdateUserData();

    // Listen for both profile updates and login events
    const handleProfileUpdate = () => {
      fetchAndUpdateUserData();
    };

    const handleLogin = () => {
      fetchAndUpdateUserData();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    window.addEventListener('userLoggedIn', handleLogin); // Add new event listener

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
      window.removeEventListener('userLoggedIn', handleLogin);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[86px] bg-white border-b border-[#E5E5E5] z-50">
      <div className="flex items-center justify-between px-6 py-5 h-full">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button - Only visible on medium screens and below */}
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="text-black text-[28px] font-medium leading-7">Dashboard</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex w-[301px] h-[46px] mr-8 pl-3.5 pr-5 py-[11px] bg-white rounded-xl border border-[#e7e7e7] justify-start items-center gap-2.5">
            <div data-svg-wrapper className="relative">
              <Image src={search} alt="search" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full text-base font-normal leading-none focus:outline-none placeholder:text-[#b0b0b0]"
            />
          </div>
          <div className="h-10 justify-between items-center flex">
            <div className="justify-start items-center gap-4 flex">
              <img 
                src={userData.image || 'https://placehold.co/40x40'}
                alt="User avatar" 
                className="w-10 h-10 rounded-[159px] border border-[#ff9292] object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/40x40';
                }}
              />
              <div className="justify-start items-center gap-1 flex">
                <div className="text-black text-base font-medium">{userData.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pass isOpen state to Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  )
}
