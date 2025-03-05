import React from 'react'
import Image from 'next/image';
import logo from '@/public/client/logo.png';

export default function Register() {
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
              />
            </div>
            <div className="self-stretch flex-col justify-start items-center gap-4 flex">
              <div className="text-center text-[#070707] text-[40px] font-bold   leading-10">Join Our Academy</div>
              <div className="w-[461.62px] text-center text-[#4a4c56] text-base font-normal   leading-normal">
                Fill out this quick questionnaire to get your first training session for FREE.
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex">
          <div className="self-stretch">
            <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">Child's Name</span>
            <span className="text-[#b60000] text-lg font-medium   leading-[18px]">*</span>
          </div>
          <div className="self-stretch p-4 rounded-lg border border-[#e9e9ea] justify-start items-center gap-2.5 inline-flex">
            <input 
              type="text"
              placeholder="Enter your child name"
              className="w-full text-[#777980] text-sm font-normal   leading-[14px] outline-none"
            />
          </div>
        </div>

        <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex mt-[18px]">
          <div className="self-stretch">
            <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">Email</span>
            <span className="text-[#b60000] text-lg font-medium   leading-[18px]">*</span>
          </div>
          <div className="self-stretch p-4 rounded-lg border border-[#e9e9ea] justify-start items-center gap-2.5 inline-flex">
            <input 
              type="email"
              placeholder="Enter your email"
              className="w-full text-[#777980] text-sm font-normal   leading-[14px] outline-none"
            />
          </div>
        </div>

        <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex mt-[18px]">
          <div className="self-stretch">
            <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">Password</span>
            <span className="text-[#b60000] text-lg font-medium   leading-[18px]">*</span>
          </div>
          <div className="self-stretch p-4 rounded-lg border border-[#e9e9ea] justify-start items-center gap-2.5 inline-flex">
            <input 
              type="password"
              placeholder="Enter your password"
              className="w-full text-[#777980] text-sm font-normal   leading-[14px] outline-none"
            />
          </div>
        </div>

        <div className="self-stretch h-[82px] flex-col justify-start items-start gap-3 flex mt-[18px]">
          <div className="self-stretch">
            <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">Age</span>
            <span className="text-[#b60000] text-lg font-medium   leading-[18px]">*</span>
          </div>
          <div className="self-stretch relative">
            <select className="w-full p-4 rounded-lg border border-[#e9e9ea] text-[#777980] text-sm font-normal   leading-[14px] appearance-none outline-none">
              <option value="5-7">5-7</option>
              <option value="8-10">8-10</option>
              <option value="11-13">11-13</option>
              <option value="14-16">14-16</option>
              <option value="17+">17+</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 7.50004C15 7.50004 11.3176 12.5 10 12.5C8.68233 12.5 5 7.5 5 7.5" stroke="#777980" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button className="self-stretch h-11 px-[18px] py-[9px] bg-[#b60000] rounded-lg justify-center items-center gap-2.5 inline-flex hover:bg-[#990000] transition-colors duration-300 ">
        <div className="text-white text-lg font-medium   leading-[18px]">Register</div>
      </button>
    </div>
  )
}
