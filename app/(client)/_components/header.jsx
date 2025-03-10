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

        <div className="absolute inset-0 w-[983px] mx-auto">
          <div className="w-[983px] h-[556px] mt-[140px] flex-col justify-start items-center gap-8 inline-flex">
            <div className="w-[217px] h-[217px] relative">
              <div className="w-[95px] h-[93px] left-[60px] top-[60px] absolute bg-[#d9d9d9] rounded-full" />
              <Image className="w-[217px] h-[217px] left-0 top-0 absolute animate-[spin_30s_linear_infinite]" src={logo} alt="hero image" />
            </div>
            <div className="self-stretch h-[307px] flex-col justify-start items-center gap-10 flex">
              <div className="self-stretch h-[195px] flex-col justify-center items-center gap-5 flex">
                <div className="self-stretch text-center text-white text-[64px] font-bold   leading-[73.60px]">
                  Game-Changing Training.
                  <br />
                  Limitless Potential.
                </div>
                <div className="w-[869px] text-center text-white text-lg font-normal   leading-[27px]">
                  we help athletes reach their goals through proven results,
                  powered by hard work and discipline."
                </div>
              </div>
              <button 
                onClick={handleSmoothScroll}
                className="h-[72px] px-[29px] py-[19px] bg-[#b60000] rounded-lg justify-center items-center gap-2.5 inline-flex hover:bg-[#990000] transition-colors duration-300"
              >
                <div className="text-white text-lg font-medium   leading-[27px]">
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
