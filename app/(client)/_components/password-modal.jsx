import React from "react";
import Image from 'next/image';
import logo from '@/public/client/logo.png';

export default function PasswordModal({ onClose }) {
  return (
    <>
      <div className="w-[676px] h-[286px] p-10 bg-white rounded-xl shadow-[0px_2px_42px_0px_rgba(0,0,0,0.05)] border border-[#ffefef] flex-col justify-start items-center gap-8 inline-flex relative">
        <div className="self-stretch h-[130px] flex-col justify-start items-start gap-[18px] flex">
          <div className="self-stretch h-10 flex-col justify-start items-center gap-10 flex">
            <div className="self-stretch h-10 flex-col justify-start items-center gap-3.5 flex">
              <div className="self-stretch text-center text-[#070707] text-[40px] font-bold   leading-10">
                Give your password
              </div>
            </div>
          </div>
          <div className="self-stretch h-[72px] flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch">
              <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">
                Password
              </span>
              <span className="text-[#b60000] text-lg font-medium   leading-[18px]">
                *
              </span>
            </div>
            <div className="self-stretch p-4 rounded-lg border border-[#e9e9ea] justify-start items-center gap-2.5 inline-flex">
              <input 
                type="password"
                placeholder="Enter your password"
                className="w-full text-[#777980] text-sm font-normal   leading-[14px] outline-none"
              />
            </div>
          </div>
        </div>
        <button className="self-stretch h-11 px-[18px] py-[9px] bg-[#b60000] rounded-lg justify-center items-center gap-2.5 inline-flex hover:bg-[#990000] transition-colors duration-300 cursor-pointer">
          <div className="text-white text-lg font-medium   leading-[18px]">
            Submit
          </div>
        </button>
        <div 
          onClick={onClose}
          className="absolute top-5 right-3.5 cursor-pointer"
        >
          <svg
            width="44"
            height="43"
            viewBox="0 0 44 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_5230_512)">
              <rect
                width="24"
                height="24"
                rx="12"
                transform="matrix(1 0 0 -1 10 24.5)"
                fill="#FFEFEF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.812 8.3083C18.056 8.06422 18.4518 8.06422 18.6958 8.3083L22.0039 11.6164L25.312 8.3083C25.556 8.06422 25.9518 8.06422 26.1958 8.3083C26.4399 8.55238 26.4399 8.94811 26.1958 9.19219L22.8878 12.5002L26.1958 15.8083C26.4399 16.0524 26.4399 16.4481 26.1958 16.6922C25.9518 16.9363 25.556 16.9363 25.312 16.6922L22.0039 13.3841L18.6958 16.6922C18.4518 16.9363 18.056 16.9363 17.812 16.6922C17.5679 16.4481 17.5679 16.0524 17.812 15.8083L21.12 12.5002L17.812 9.19219C17.5679 8.94811 17.5679 8.55238 17.812 8.3083Z"
                fill="#09080D"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_5230_512"
                x="0.857142"
                y="0.5"
                width="42.2857"
                height="42.2857"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="9.14286"
                  operator="erode"
                  in="SourceAlpha"
                  result="effect1_dropShadow_5230_512"
                />
                <feOffset dy="9.14286" />
                <feGaussianBlur stdDeviation="9.14286" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.0583333 0 0 0 0 0.0583333 0 0 0 0 0.0583333 0 0 0 0.1 0"
                />
                <feBlend
                  mode="multiply"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_5230_512"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_5230_512"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}
