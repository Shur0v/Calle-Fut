'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import icon1 from '@/public/dashboard/icon/icon1.svg';
import icon2 from '@/public/dashboard/icon/icon2.svg';
import icon3 from '@/public/dashboard/icon/icon3.svg';
import icon4 from '@/public/dashboard/icon/redo.svg';
import icon5 from '@/public/dashboard/icon/icon5.svg';
import icon6 from '@/public/dashboard/icon/icon6.svg';
import logoutIcon from '@/public/dashboard/icon/logout.svg';

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear all types of storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    toast.success('Logged out successfully');
    router.push('/admin-login');
  };

  return (
    <>
      {/* Overlay with blur effect - Only visible when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 md:hidden transition-all"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-[86px] h-[calc(100vh-86px)] w-[280px] bg-white flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <ul className='p-6'>
            <li className={`rounded-[14px] transition-colors mt-2 ${
              pathname === '/dashboard' 
                ? 'bg-[#FFEFEF] border-r-4 border-[#B60000]' 
                : 'hover:bg-[#FFEFEF]/80 group'
            }`}>
                <Link href="/dashboard">
                    <div className="flex items-center gap-3 px-4 py-[14px]">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          pathname === '/dashboard' 
                            ? 'bg-white' 
                            : 'bg-[#FFEFEF] group-hover:bg-white'
                        }`}>
                            <Image 
                                src={icon1} 
                                alt="Dashboard Icon" 
                                className="w-5 h-5"
                            />
                        </div>
                        <span className={`text-base font-medium ${
                          pathname === '/dashboard' 
                            ? 'text-[#B60000]' 
                            : 'text-[#777980]'
                        }`}>Dashboard</span>
                    </div>
                </Link>
            </li>

            <li className={`rounded-[14px] transition-colors mt-2 ${
              pathname === '/dashboard/students' 
                ? 'bg-[#FFEFEF] border-r-4 border-[#B60000]' 
                : 'hover:bg-[#FFEFEF]/80 group'
            }`}>
                <Link href="/dashboard/students">
                    <div className="flex items-center gap-3 px-4 py-[14px]">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          pathname === '/dashboard/students' 
                            ? 'bg-white' 
                            : 'bg-[#FFEFEF] group-hover:bg-white'
                        }`}>
                            <Image 
                                src={icon2} 
                                alt="Dashboard Icon" 
                                className="w-5 h-5"
                            />
                        </div>
                        <span className={`text-base font-medium ${
                          pathname === '/dashboard/students' 
                            ? 'text-[#B60000]' 
                            : 'text-[#777980]'
                        }`}>Students</span>
                    </div>
                </Link>
            </li>
            
            <li className={`rounded-[14px] transition-colors mt-2 ${
              pathname === '/dashboard/email-templates' 
                ? 'bg-[#FFEFEF] border-r-4 border-[#B60000]' 
                : 'hover:bg-[#FFEFEF]/80 group'
            }`}>
                <Link href="/dashboard/email-templates">
                    <div className="flex items-center gap-3 px-4 py-[14px]">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          pathname === '/dashboard/email-templates' 
                            ? 'bg-white' 
                            : 'bg-[#FFEFEF] group-hover:bg-white'
                        }`}>
                            <Image 
                                src={icon3} 
                                alt="Email Templates Icon" 
                                className="w-5 h-5"
                            />
                        </div>
                        <span className={`text-base font-medium ${
                          pathname === '/dashboard/email-templates' 
                            ? 'text-[#B60000]' 
                            : 'text-[#777980]'
                        }`}>Email Templates</span>
                    </div>
                </Link>
            </li>
            
            <li className={`rounded-[14px] transition-colors mt-2 ${
              pathname === '/dashboard/email-logs' 
                ? 'bg-[#FFEFEF] border-r-4 border-[#B60000]' 
                : 'hover:bg-[#FFEFEF]/80 group'
            }`}>
                <Link href="/dashboard/email-logs">
                    <div className="flex items-center gap-3 px-4 py-[14px]">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          pathname === '/dashboard/email-logs' 
                            ? 'bg-white' 
                            : 'bg-[#FFEFEF] group-hover:bg-white'
                        }`}>
                            <Image 
                                src={icon4} 
                                alt="Email Logs Icon" 
                                className="w-5 h-5"
                            />
                        </div>
                        <span className={`text-base font-medium ${
                          pathname === '/dashboard/email-logs' 
                            ? 'text-[#B60000]' 
                            : 'text-[#777980]'
                        }`}>Email Logs</span>
                    </div>
                </Link>
            </li>

            <li className={`rounded-[14px] transition-colors mt-2 ${
              pathname === '/dashboard/booking-request' 
                ? 'bg-[#FFEFEF] border-r-4 border-[#B60000]' 
                : 'hover:bg-[#FFEFEF]/80 group'
            }`}>
                <Link href="/dashboard/booking-request">
                    <div className="flex items-center gap-3 px-4 py-[14px]">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          pathname === '/dashboard/booking-request' 
                            ? 'bg-white' 
                            : 'bg-[#FFEFEF] group-hover:bg-white'
                        }`}>
                            <Image 
                                src={icon5} 
                                alt="Booking Request Icon" 
                                className="w-5 h-5"
                            />
                        </div>
                        <span className={`text-base font-medium ${
                          pathname === '/dashboard/booking-request' 
                            ? 'text-[#B60000]' 
                            : 'text-[#777980]'
                        }`}>Booking Request</span>
                    </div>
                </Link>
            </li>

            <li className={`rounded-[14px] transition-colors mt-2 ${
              pathname === '/dashboard/setting' 
                ? 'bg-[#FFEFEF] border-r-4 border-[#B60000]' 
                : 'hover:bg-[#FFEFEF]/80 group'
            }`}>
                <Link href="/dashboard/setting">
                    <div className="flex items-center gap-3 px-4 py-[14px]">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          pathname === '/dashboard/setting' 
                            ? 'bg-white' 
                            : 'bg-[#FFEFEF] group-hover:bg-white'
                        }`}>
                            <Image 
                                src={icon6} 
                                alt="Settings Icon" 
                                className="w-5 h-5"
                            />
                        </div>
                        <span className={`text-base font-medium ${
                          pathname === '/dashboard/setting' 
                            ? 'text-[#B60000]' 
                            : 'text-[#777980]'
                        }`}>Settings</span>
                    </div>
                </Link>
            </li>
        </ul>
        
        <div className="p-6 border-t border-gray-100">
            <div className="rounded-[14px] transition-colors hover:bg-[#FFEFEF]/80 group cursor-pointer" onClick={handleLogout}>
                <div className="flex items-center gap-3 px-4 py-[14px]">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[#FFEFEF] group-hover:bg-white">
                        <Image 
                            src={logoutIcon} 
                            alt="Logout Icon" 
                            className="w-5 h-5"
                        />
                    </div>
                    <span className="text-base font-medium text-[#777980]">Logout</span>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
