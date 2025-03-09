"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/client/logo.png";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Login from "./login";
import Register from "./register";
import AuthApis from "@/app/api/authApis";

export default function Menu() {
  const pathname = usePathname();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication status on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    // Check initial auth state
    checkAuth();

    // Listen for storage changes
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Define menu items with their paths
  const menuItems = [
    { name: 'Home', path: 'home' },
    { name: 'What we offer', path: 'what-we-offer' },
    { name: 'Our coaches', path: 'our-coaches' },
    { name: 'Book a session', path: 'book-a-session' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    AuthApis.logout();
    setIsAuthenticated(false);
    setUser(null);
    // Redirect to main page
    window.location.href = '/';
  };

  return (
    <>
      <div className="center w-[1320px] mx-auto relative z-50">
        <div className="w-[1320px] h-20 px-6 mt-6 py-3 bg-white/90 rounded-2xl backdrop-blur-[66px] justify-between items-center inline-flex">
          <div 
            onClick={() => scrollToSection('home')}
            className="cursor-pointer"
          >
            <Image className="w-[55.81px] h-14" alt="logo" src={logo} />
          </div>
          
          <div className="justify-start items-center gap-8 flex">
            {menuItems.map((item) => (
              <div 
                key={item.path}
                onClick={() => scrollToSection(item.path)}
                className="relative group cursor-pointer"
              >
                <div className="text-black text-lg font-normal   leading-[27px] group-hover:text-[#b60000] transition-colors duration-300">
                  {item.name}
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b60000] group-hover:w-full transition-all duration-300 origin-right"></div>
              </div>
            ))}
          </div>

          <div className="justify-start items-center gap-5 flex">
            {isAuthenticated ? (
              // Show logout button when authenticated
              <div 
                onClick={handleLogout}
                className="px-[18px] py-3 rounded-lg border border-[#b60000] justify-center items-center gap-2.5 flex cursor-pointer hover:bg-[#ffefef] transition-colors duration-300"
              >
                <div className="text-[#b60000] text-lg font-medium   leading-[27px]">
                  Logout
                </div>
              </div>
            ) : (
              // Show login and register buttons when not authenticated
              <>
                <div 
                  onClick={() => setShowLoginModal(true)}
                  className="px-[18px] py-3 rounded-lg border border-[#b60000] justify-center items-center gap-2.5 flex cursor-pointer hover:bg-[#ffefef] transition-colors duration-300"
                >
                  <div className="text-[#b60000] text-lg font-medium   leading-[27px]">
                    Log In
                  </div>
                </div>
                <div 
                  onClick={() => setShowRegisterModal(true)}
                  className="px-[18px] py-3 bg-[#b60000] rounded-lg justify-center items-center gap-2.5 flex cursor-pointer hover:bg-[#990000] transition-colors duration-300"
                >
                  <div className="text-white text-lg font-medium   leading-[27px]">
                    Sign Up
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 backdrop-blur-[2px] bg-black/60 flex items-center justify-center z-[60] animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowLoginModal(false);
            }
          }}
        >
          <div className="relative animate-slideUp">
            <Login onLoginSuccess={() => {
              setShowLoginModal(false);
              setIsAuthenticated(true);
              const userData = localStorage.getItem('user');
              if (userData) {
                setUser(JSON.parse(userData));
              }
            }} />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div 
          className="fixed inset-0 backdrop-blur-[2px] bg-black/60 flex items-center justify-center z-[60] animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRegisterModal(false);
            }
          }}
        >
          <div className="relative animate-slideUp">
            <Register onRegisterSuccess={() => {
              setShowRegisterModal(false);
              setIsAuthenticated(true);
              const userData = localStorage.getItem('user');
              if (userData) {
                setUser(JSON.parse(userData));
              }
            }} />
          </div>
        </div>
      )}
    </>
  );
}
