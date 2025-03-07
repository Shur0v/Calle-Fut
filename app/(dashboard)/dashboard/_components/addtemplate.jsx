'use client'
import React from 'react'
import { useForm } from 'react-hook-form';

export default function AddTemplate({ isOpen, onClose, onSubmit }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSubmitForm = (data) => {
    // Add current date to the form data
    const formData = {
      ...data,
      id: Date.now(), // Generate a unique ID
      date: new Date().toLocaleDateString('en-GB') // Format: DD/MM/YYYY
    };
    
    onSubmit(formData);
    reset(); // Reset form after submission
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 backdrop-blur-xs bg-[#000]/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="w-[638px] h-[488px] p-6 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex relative shadow-lg">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <form onSubmit={handleSubmit(onSubmitForm)} className="w-full">
          <div className="self-stretch h-[372px] flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch text-[#070707] text-2xl font-medium   leading-normal">Add Email Template</div>
            <div className="self-stretch h-[324px] flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal   leading-none">Template Name</div>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Template Name"
                    {...register("templateName", { required: "Template name is required" })}
                    className="w-full h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal  "
                  />
                  {errors.templateName && (
                    <p className="text-red-500 text-sm">{errors.templateName.message}</p>
                  )}
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal   leading-none">Subject</div>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter subject..."
                    {...register("subject", { required: "Subject is required" })}
                    className="w-full h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal  "
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm">{errors.subject.message}</p>
                  )}
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal   leading-none">Body</div>
                  </div>
                  <textarea
                    placeholder="Compose your email..."
                    {...register("body", { required: "Email body is required" })}
                    className="w-full h-[116px] px-5 py-[13px] rounded-lg border border-[#e5e1e1] text-[#777980] text-sm font-normal   resize-none"
                  />
                  {errors.body && (
                    <p className="text-red-500 text-sm">{errors.body.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="justify-start items-start gap-4 inline-flex mt-6">
            <button
              type="submit"
              className="w-[98px] h-12 px-[18px] py-3 bg-[#b60000] rounded-lg justify-center items-center gap-1.5 flex hover:bg-[#a00000] transition-colors"
            >
              <div className="text-white text-base font-medium   leading-none">Save</div>
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-[18px] py-3 rounded-lg border border-[#db0000]/30 justify-center items-center gap-1.5 flex hover:bg-[#ffefef] transition-colors"
            >
              <div className="text-[#b60000] text-base font-medium   leading-none">Cancel</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
