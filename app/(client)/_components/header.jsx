"use client";
import React from "react";
import Image from 'next/image';
import logo from '@/public/client/logo.png';
import banner from '@/public/client/banner.png';
import Menu from "./menu";

export default function Header() {
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const element = document.getElementById('book-a-session');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <div className="relative w-screen h-screen">
        <Image
          src={banner}
          alt="Background Banner"
          fill
          className="object-cover"
          priority
        />

        {/* Fixed Menu at the top */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Menu />
        </div>

        <div className="absolute inset-0 w-full max-w-[983px] mx-auto px-4 md:px-6">
          <div className="w-full max-w-[983px] h-auto md:h-[556px] mt-[160px] md:mt-[140px] flex-col justify-start items-center gap-6 md:gap-8 inline-flex">
            <div className="w-[160px] h-[160px] md:w-[217px] md:h-[217px] relative">
              <div className="w-[70px] h-[70px] md:w-[95px] md:h-[93px] left-[45px] md:left-[60px] top-[45px] md:top-[60px] absolute bg-[#d9d9d9] rounded-full" />
              <Image className="w-full h-full left-0 top-0 absolute animate-[spin_30s_linear_infinite]" src={logo} alt="hero image" />
            </div>
            <div className="self-stretch h-auto md:h-[307px] flex-col justify-start items-center gap-6 md:gap-10 flex">
              <div className="self-stretch h-auto md:h-[195px] flex-col justify-center items-center gap-4 md:gap-5 flex">
                <div className="self-stretch text-center text-white text-3xl sm:text-5xl md:text-[64px] font-bold leading-tight md:leading-[73.60px] px-4">
                  Game-Changing Training.
                  <br />
                  Limitless Potential.
                </div>
                <div className="w-full max-w-[869px] text-center text-white text-base md:text-lg font-normal leading-normal md:leading-[27px] px-4">
                  we help athletes reach their goals through proven results,
                  powered by hard work and discipline."
                </div>
              </div>
              <button 
                onClick={handleSmoothScroll}
                className="h-[60px] md:h-[72px] px-6 md:px-[29px] py-4 md:py-[19px] bg-[#b60000] rounded-lg justify-center items-center gap-2.5 inline-flex hover:bg-[#990000] transition-colors duration-300"
              >
                <div className="text-white text-base md:text-lg font-medium leading-normal md:leading-[27px]">
                  Book a session
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
