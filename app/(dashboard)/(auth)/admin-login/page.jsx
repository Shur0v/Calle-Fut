import React from 'react'
import Image from 'next/image';
import logo from '@/public/client/logo.png';

export default function AdminLogin() {
  return (
    <>
    <div className="center h-screen flex justify-center items-center">
      <div className="w-[594px] h-auto p-10 bg-white rounded-xl shadow-[0px_2px_42px_0px_rgba(0,0,0,0.05)] border border-[#ffefef] flex-col justify-start items-center gap-8 inline-flex">
        <div className="self-stretch h-auto flex-col justify-start items-start gap-12 flex">
          <div className="self-stretch h-[134px] flex-col justify-start items-center gap-10 flex">
            <div className="self-stretch h-[134px] flex-col justify-start items-center gap-3.5 flex">
              <div className="w-20 h-20 relative">
                <div className="w-[35.02px] h-[34.29px] left-[22.12px] top-[22.12px] absolute bg-[#d9d9d9] rounded-full" />
                <Image 
                  src={logo} 
                  alt="Logo" 
                  className="w-20 h-20 left-0 top-0 absolute" 
                  width={80} 
                  height={80}
                />
              </div>
              <div className="text-center text-[#070707] text-[40px] font-bold   leading-10">Login Your Dashboard</div>
            </div>
          </div>
          <div className="self-stretch h-[170px] flex-col justify-start items-start gap-[18px] flex">
            <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch text-[#1d1f2c] text-lg font-medium   leading-[18px]">Email</div>
              <div className="self-stretch p-4 rounded-lg border border-[#e9e9ea] justify-start items-center gap-2.5 inline-flex">
                <input 
                  type="text"
                  placeholder="Enter your email"
                  className="w-full text-[#777980] text-sm font-normal   leading-[14px] outline-none"
                />
              </div>
            </div>
            <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex mt-[18px]">
              <div className="self-stretch text-[#1d1f2c] text-lg font-medium   leading-[18px]">Password</div>
              <div className="self-stretch p-4 rounded-lg border border-[#e9e9ea] justify-start items-center gap-2.5 inline-flex">
                <input 
                  type="password"
                  placeholder="Enter your password"
                  className="w-full text-[#777980] text-sm font-normal   leading-[14px] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <button className="self-stretch h-11 px-[18px] py-[9px] bg-[#b60000] rounded-lg justify-center items-center gap-2.5 inline-flex hover:bg-[#990000] transition-colors duration-300 mt-[18px]">
          <div className="text-white text-lg font-medium   leading-[18px]">Log in</div>
        </button>
      </div>
    </div>
    </>
  )
}
