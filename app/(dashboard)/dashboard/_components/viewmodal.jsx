'use client'
import React from 'react'

export default function ViewModal({ isOpen, onClose, data }) {
  console.log('ViewModal props:', { isOpen, data });
  
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 backdrop-blur-xs bg-[#000]/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="w-[705px] p-6 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex relative shadow-lg">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="self-stretch flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch text-[#070707] text-2xl font-medium   leading-normal">View Student Details</div>
          <div className="self-stretch flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch justify-start items-start gap-4 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  <div className="text-[#4a4c56] text-base font-normal   leading-none">Name</div>
                </div>
                <div className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4">
                  <div className="text-[#777980] text-sm font-normal  ">{data?.name || ''}</div>
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-4 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  <div className="text-[#4a4c56] text-base font-normal   leading-none">Age</div>
                </div>
                <div className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4">
                  <div className="text-[#777980] text-sm font-normal  ">{data?.age || ''}</div>
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-4 inline-flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  <div className="text-[#4a4c56] text-base font-normal   leading-none">Email</div>
                </div>
                <div className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4">
                  <div className="text-[#777980] text-sm font-normal  ">{data?.email || ''}</div>
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-4 inline-flex">
              <div className="w-full self-stretch justify-start items-start gap-4 flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal   leading-none">Join Date</div>
                  </div>
                  <div className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4">
                    <div className="text-[#777980] text-sm font-normal  ">{data?.joinDate || ''}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-4 inline-flex">
              <div className="w-full self-stretch justify-start items-start gap-4 flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal   leading-none">Time</div>
                  </div>
                  <div className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4">
                    <div className="text-[#777980] text-sm font-normal  ">{data?.time || ''}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-4 inline-flex">
              <div className="w-full self-stretch justify-start items-start gap-4 flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal   leading-none">Status</div>
                  </div>
                  <div className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4">
                    <div className="text-[#777980] text-sm font-normal  ">{data?.status || ''}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
