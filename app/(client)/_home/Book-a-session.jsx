"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import top from "@/public/client/contacttop.png";
import bottom from "@/public/client/contactbottom.png";
import PasswordModal from "../_components/password-modal";
import { BookingRequestApis } from "@/app/api/bookingRequestApis";
import { toast } from "react-hot-toast";

const ageOptions = ["5-7", "8-10", "11-13", "14-16", "17+"];

export default function BookSession() {
  const [isMounted, setIsMounted] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  
  // Function to get current datetime in YYYY-MM-DDThh:mm format
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      age: "5-7",
      sessionDateTime: getCurrentDateTime() // Set current time as default
    },
  });

  // Watch the sessionDateTime value for validation
  const selectedDateTime = watch("sessionDateTime");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Validate if selected time is in the past
  const validateDateTime = (value) => {
    const selected = new Date(value);
    const now = new Date();
    return selected > now || "Cannot book sessions in the past";
  };

  const handlePasswordSubmit = async (password) => {
    if (!formData) return;
    
    try {
      setLoading(true);
      
      // Validate required fields
      if (!formData.childName || !formData.parentName || !formData.emailPhone || !formData.phoneNumber || !formData.age || !formData.sessionDateTime || !password) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Format data according to API expectations
      const apiData = {
        name: formData.childName.trim(),
        parent_name: formData.parentName.trim(),
        email: formData.emailPhone.trim().toLowerCase(),
        phone_number: formData.phoneNumber.trim(),
        age: parseInt(formData.age.split('-')[0]), // Convert age to number
        session_date_time: formData.sessionDateTime,
        password: password.trim(),
        additional_notes: formData.notes?.trim() || ''
      };

      // Log the request data (without password)
      console.log('Booking Request Data:', {
        ...apiData,
        password: '******'
      });

      const response = await BookingRequestApis.createBooking(apiData);
      console.log('Booking Response:', response);
      
      if (response.success) {
        toast.success(response.message || 'Booking created successfully');
        reset(); // Reset form
        setShowPasswordModal(false);
        setFormData(null); // Clear stored form data
      } else {
        // Show specific error message
        toast.error(response.message || 'Failed to create booking. Please try again.');
        console.error('Booking Error:', response.error);
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    // Validate datetime before showing password modal
    const selected = new Date(data.sessionDateTime);
    const now = new Date();
    if (selected <= now) {
      toast.error("Cannot book sessions in the past. Please select a future time.");
      return;
    }
    setFormData(data);
    setShowPasswordModal(true);
  };

  // Return null on the server side
  if (typeof window === 'undefined') {
    return null;
  }

  // Return null until the component is mounted on the client
  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-[#F8F8F8] relative">
      {/* Top Background Image */}
      <div 
        className="absolute top-0 left-0 w-[120px] h-[120px] md:w-[234px] md:h-[234px] bg-[url('/client/contacttop.png')] bg-no-repeat bg-contain"
        style={{ backgroundPosition: "top left" }}
      />

      {/* Bottom Background Image */}
      <div 
        className="absolute bottom-0 right-0 w-[120px] h-[120px] md:w-[234px] md:h-[234px] bg-[url('/client/contactbottom.png')] bg-no-repeat bg-contain"
        style={{ backgroundPosition: "bottom right" }}
      />

      <div className="container mx-auto max-w-[1324px] px-4 py-[50px] md:py-[100px] relative">
        <h1 className="text-center text-3xl md:text-5xl font-bold mb-5 w-full md:w-[870px] mx-auto px-4">
        Prior to making a request for a training session, please make an
        account first. Then you can request your session.
        </h1>
        <p className="text-center text-base md:text-lg font-normal text-[#4A4C56] w-full md:w-[869px] mx-auto mb-8 md:mb-14 px-4">
          Book your 1st session FREE today & see the results yourself!
        </p>

        <div className="flex justify-center px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-[741px] h-auto p-5 md:p-10 bg-white rounded-xl shadow-[0px_2px_42px_0px_rgba(0,0,0,0.05)] flex-col justify-start items-center gap-8 inline-flex relative z-10"
          >
            <div className="self-stretch h-auto flex-col justify-start items-start gap-[18px] flex">
              {/* Child's Name */}
              <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex mb-4">
                <div className="self-stretch">
                  <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">
                    Child's Name
                  </span>
                  <span className="text-[#b60000] text-lg font-medium   leading-[18px]">
                    *
                  </span>
                </div>
                <div className="self-stretch relative">
                  <input
                    {...register("childName", { required: true })}
                    className={`w-full p-4 rounded-lg border ${errors.childName ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px]`}
                    placeholder="Enter your child name"
                  />
                  {errors.childName && (
                    <span className="text-red-500 text-xs mt-1">Child's name is required</span>
                  )}
                </div>
              </div>

              {/* Parent's Name */}
              <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex mb-4">
                <div className="self-stretch">
                  <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">
                    Parent's Name
                  </span>
                  <span className="text-[#b60000] text-lg font-medium   leading-[18px]">
                    *
                  </span>
                </div>
                <div className="self-stretch relative">
                  <input
                    {...register("parentName", { required: true })}
                    className={`w-full p-4 rounded-lg border ${errors.parentName ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px]`}
                    placeholder="Enter your Parent's Name"
                  />
                  {errors.parentName && (
                    <span className="text-red-500 text-xs mt-1">Parent's name is required</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex mb-4">
                <div className="self-stretch">
                  <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">
                    Email
                  </span>
                  <span className="text-[#b60000] text-lg font-medium   leading-[18px]">
                    *
                  </span>
                </div>
                <div className="self-stretch relative">
                  <input
                    {...register("emailPhone", { 
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={`w-full p-4 rounded-lg border ${errors.emailPhone ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px]`}
                    placeholder="Enter your email"
                  />
                  {errors.emailPhone && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.emailPhone.type === 'pattern' ? 'Invalid email address' : 'Email is required'}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="self-stretch h-[76px] flex-col justify-start items-start gap-3 flex mb-4">
                <div className="self-stretch">
                  <span className="text-[#1d1f2c] text-lg font-medium leading-[18px]">
                    Phone Number
                  </span>
                  <span className="text-[#b60000] text-lg font-medium leading-[18px]">
                    *
                  </span>
                </div>
                <div className="self-stretch relative">
                  <input
                    type="tel"
                    {...register("phoneNumber", { 
                      required: "Phone number is required",
                      pattern: {
                        value: /^\d{9,13}$/,
                        message: "Phone number must be between 9 and 13 digits"
                      }
                    })}
                    className={`w-full p-4 rounded-lg border ${errors.phoneNumber ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px]`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && (
                    <span className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</span>
                  )}
                </div>
              </div>

              {/* Age */}
              <div className="self-stretch h-[82px] flex-col justify-start items-start gap-3 flex mb-4">
                <div className="self-stretch">
                  <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">
                    Age
                  </span>
                  <span className="text-[#b60000] text-lg font-medium   leading-[18px]">
                    *
                  </span>
                </div>
                <div className="self-stretch relative">
                  <select
                    {...register("age", { required: true })}
                    className={`w-full p-4 rounded-lg border ${errors.age ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px] appearance-none`}
                  >
                    {ageOptions.map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.3174 8.00004C15.3174 8.00004 11.635 13 10.3174 13C8.99972 13 5.31738 8 5.31738 8"
                        stroke="#777980"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {errors.age && (
                    <span className="text-red-500 text-xs mt-1">Age is required</span>
                  )}
                </div>
              </div>

              {/* Preferred Session Date and Time */}
              <div className="self-stretch h-[82px] flex-col justify-start items-start gap-3 flex mb-4">
                <div>
                  <span className="text-[#1d1f2c] text-lg font-medium leading-[18px]">
                    Preferred Session Date & Time
                  </span>
                  <span className="text-[#b60000] text-lg font-medium leading-[18px]">
                    *
                  </span>
                </div>
                <div className="self-stretch relative">
                  <input
                    type="datetime-local"
                    {...register("sessionDateTime", { 
                      required: "Session date and time is required",
                      validate: validateDateTime
                    })}
                    min={getCurrentDateTime()}
                    defaultValue={getCurrentDateTime()}
                    className={`w-full p-4 rounded-lg border ${errors.sessionDateTime ? 'border-red-500' : 'border-[#e9e9ea]'} text-[#777980] text-sm font-normal leading-[14px]`}
                  />
                  {errors.sessionDateTime && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.sessionDateTime.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="self-stretch h-[145px] flex-col justify-start items-start gap-3 flex mb-4">
                <div className="self-stretch">
                  <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">
                    Additional Notes
                  </span>
                  <span className="text-[#777980] text-base font-medium   leading-none">
                    {" "}
                    (Optional)
                  </span>
                </div>
                <textarea
                  {...register("notes")}
                  className="w-full h-[114px] p-4 rounded-lg border border-[#e9e9ea] text-[#777980] text-sm font-normal   leading-[14px] resize-none"
                  placeholder="Enter any additional notes"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`self-stretch h-14 px-[18px] py-3 bg-[#b60000] rounded-lg justify-center items-center gap-2.5 inline-flex -mt-3 hover:bg-[#990000] transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="text-white text-lg font-medium leading-[27px]">
                {loading ? 'Submitting...' : 'Request Booking'}
              </div>
            </button>
          </form>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div 
          className="fixed inset-0 backdrop-blur-[2px] bg-black/60 flex items-center justify-center z-[60] animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPasswordModal(false);
            }
          }}
        >
          <div className="relative animate-slideUp">
            <PasswordModal 
              onClose={() => setShowPasswordModal(false)}
              onSubmit={handlePasswordSubmit}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
