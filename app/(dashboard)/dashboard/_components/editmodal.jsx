'use client'
import React from 'react'
import { useForm } from 'react-hook-form';

export default function EditModal({ isOpen, onClose, data, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: data?.name || '',
      age: data?.age || '',
      email: data?.email || '',
      time: data?.time || '',
      status: data?.status || ''
    }
  });

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 backdrop-blur-xs bg-[#000]/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="w-[705px] h-[612px] p-6 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex relative shadow-lg">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
          <div className="self-stretch h-[496px] flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch text-[#070707] text-2xl font-medium font-['Montserrat'] leading-normal">Edit</div>
            <div className="self-stretch h-[448px] flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal font-['Montserrat'] leading-none">Name</div>
                  </div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal font-['Montserrat']"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
              </div>

              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal font-['Montserrat'] leading-none">Age</div>
                  </div>
                  <input
                    {...register("age", { required: "Age is required" })}
                    className="w-full h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal font-['Montserrat']"
                  />
                  {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                </div>
              </div>

              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal font-['Montserrat'] leading-none">Email</div>
                  </div>
                  <input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal font-['Montserrat']"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
              </div>

              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="w-full self-stretch justify-start items-start gap-4 flex">
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="text-[#4a4c56] text-base font-normal font-['Montserrat'] leading-none">Time</div>
                    </div>
                    <input
                      {...register("time", { required: "Time is required" })}
                      className="w-full h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal font-['Montserrat']"
                    />
                    {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                  </div>
                </div>
              </div>

              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="w-full self-stretch justify-start items-start gap-4 flex">
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="text-[#4a4c56] text-base font-normal font-['Montserrat'] leading-none">Status</div>
                    </div>
                    <select
                      {...register("status", { required: "Status is required" })}
                      className="w-full h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal font-['Montserrat']"
                    >
                      <option value="">Select status</option>
                      <option value="Active Student">Active Student</option>
                      <option value="Inactive Student">Inactive Student</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="justify-start items-center gap-4 inline-flex mt-6">
            <button
              type="submit"
              className="w-[90px] h-12 px-[18px] py-3 bg-[#b60000] rounded-lg justify-center items-center gap-1.5 flex hover:bg-[#a00000] transition-colors"
            >
              <span className="text-white text-base font-medium font-['Montserrat'] leading-none">Save</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-[18px] py-3 rounded-lg border border-[#db0000]/30 justify-center items-center gap-1.5 flex hover:bg-[#ffefef] transition-colors"
            >
              <span className="text-[#b60000] text-base font-medium font-['Montserrat'] leading-none">Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
