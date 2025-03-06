'use client'
import React from 'react'

export default function DeleteModal({ isOpen, onClose, data, onDelete }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = () => {
    onDelete(data.id);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 backdrop-blur-xs bg-[#000]/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="w-[500px] p-6 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex relative shadow-lg">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="self-stretch flex-col justify-start items-center gap-6 flex">
          <div className="w-16 h-16 bg-[#ffefef] rounded-full flex items-center justify-center mb-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="#b60000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#b60000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="text-center flex flex-col gap-2">
            <h3 className="text-lg font-semibold font-['Montserrat'] text-[#070707]">
              Are you sure you want to delete this record?
            </h3>
            <p className="text-[#777980] text-sm font-normal font-['Montserrat']">
              {data?.name ? `"${data.name}"` : 'This record'} will be permanently removed from the system.<br/>
              This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-[#b60000] rounded-lg text-white text-base font-medium font-['Montserrat'] hover:bg-[#a00000] transition-colors"
            >
              Yes, Delete
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-[#db0000]/30 rounded-lg text-[#b60000] text-base font-medium font-['Montserrat'] hover:bg-[#ffefef] transition-colors"
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
