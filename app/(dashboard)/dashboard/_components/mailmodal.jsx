'use client'
import React from 'react'
import { useForm } from 'react-hook-form';

export default function MailModal({ isOpen, onClose, selectedStudents }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    console.log('Selected Students:', selectedStudents);
    onClose();
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

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="self-stretch h-[464px] flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch text-[#070707] text-2xl font-medium font-['Montserrat'] leading-normal">Compose Email</div>
            <div className="self-stretch h-[416px] flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal font-['Montserrat'] leading-none">Recipients:</div>
                  </div>
                  <div className="w-full h-[56px] rounded-lg border border-[#E5E1E1] p-4">
                    <div className="text-[#777980] text-sm font-normal font-['Montserrat'] leading-[14px]">
                      {selectedStudents?.length === 1 
                        ? `${selectedStudents[0].name} (${selectedStudents[0].email})`
                        : `All Students Selected (${selectedStudents?.length || 0} students)`
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal font-['Montserrat'] leading-none">Template Name</div>
                  </div>
                  <select 
                    {...register("templateName", { required: "Template is required" })}
                    className="w-full h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal font-['Montserrat']"
                  >
                    <option value="">Select template</option>
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                    <option value="template3">Template 3</option>
                  </select>
                  {errors.templateName && <p className="text-red-500 text-sm mt-1">{errors.templateName.message}</p>}
                </div>
              </div>

              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal font-['Montserrat'] leading-none">Subject:</div>
                  </div>
                  <input 
                    type="text"
                    placeholder="Enter subject..."
                    {...register("subject", { required: "Subject is required" })}
                    className="w-full h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal font-['Montserrat']"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                </div>
              </div>

              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal font-['Montserrat'] leading-none">Body</div>
                  </div>
                  <textarea 
                    placeholder="Compose your email..."
                    {...register("body", { required: "Email body is required" })}
                    className="w-full h-[116px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal font-['Montserrat'] resize-none"
                  />
                  {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="justify-start items-center gap-4 inline-flex mt-6">
            <button 
              type="submit"
              className="px-[18px] py-3 bg-[#b60000] rounded-lg justify-center items-center gap-1.5 flex hover:bg-[#a00000] transition-colors"
            >
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.90366 10.9167L12.8203 8" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.60906 7.50556C1.72572 7.82104 1.80193 9.09466 2.71659 9.30257L9.90348 10.917L11.5179 18.1039C11.7258 19.0186 12.9994 19.0947 13.3149 18.2114L18.597 3.42163C18.863 2.67671 18.1437 1.95746 17.3988 2.2235L2.60906 7.50556Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-base font-medium font-['Montserrat'] leading-none">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
