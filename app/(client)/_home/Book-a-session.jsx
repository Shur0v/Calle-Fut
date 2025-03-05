"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import top from "@/public/client/contacttop.png";
import bottom from "@/public/client/contactbottom.png";
import PasswordModal from "../_components/password-modal";

const ageOptions = ["5-7", "8-10", "11-13", "14-16", "17+"];
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function BookSession() {
  const [isMounted, setIsMounted] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: "5-7",
      sessionDay: "Monday",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = (data) => {
    setShowPasswordModal(true);
    console.log("Form Data:", data);
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
        className="absolute top-0 left-0 w-[234px] h-[234px] bg-[url('/client/contacttop.png')] bg-no-repeat bg-contain"
        style={{ backgroundPosition: "top left" }}
      />

      {/* Bottom Background Image */}
      <div 
        className="absolute bottom-0 right-0 w-[234px] h-[234px] bg-[url('/client/contactbottom.png')] bg-no-repeat bg-contain"
        style={{ backgroundPosition: "bottom right" }}
      />

      <div className="container mx-auto max-w-[1324px] py-[100px] relative">
        <h1 className="text-center text-5xl font-bold mb-5 w-[870px] mx-auto">
          Ready to take your game to the next level?
        </h1>
        <p className="text-center text-lg font-normal text-[#4A4C56] w-[869px] mx-auto mb-14">
          Book your 1st session FREE today & see the results yourself!
        </p>

        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[741px] h-auto p-10 bg-white rounded-xl shadow-[0px_2px_42px_0px_rgba(0,0,0,0.05)] flex-col justify-start items-center gap-8 inline-flex relative z-10"
          >
            <div className="self-stretch h-[627px] flex-col justify-start items-start gap-[18px] flex">
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
                    className="w-full p-4 rounded-lg border border-[#e9e9ea] text-[#777980] text-sm font-normal   leading-[14px]"
                    placeholder="Enter your child name"
                  />
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
                    className="w-full p-4 rounded-lg border border-[#e9e9ea] text-[#777980] text-sm font-normal   leading-[14px]"
                    placeholder="Enter your Parent's Name"
                  />
                </div>
              </div>

              {/* Email/Phone */}
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
                    {...register("emailPhone", { required: true })}
                    className="w-full p-4 rounded-lg border border-[#e9e9ea] text-[#777980] text-sm font-normal   leading-[14px]"
                    placeholder="Enter your email"
                  />
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
                    {...register("age")}
                    className="w-full p-4 rounded-lg border border-[#e9e9ea] text-[#777980] text-sm font-normal   leading-[14px] appearance-none"
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
                </div>
              </div>

              {/* Preferred Session Day */}
              <div className="self-stretch h-[82px] flex-col justify-start items-start gap-3 flex mb-4">
                <div>
                  <span className="text-[#1d1f2c] text-lg font-medium   leading-[18px]">
                    Preferred Session Day
                  </span>
                  <span className="text-[#b60000] text-lg font-medium   leading-[18px]">
                    *
                  </span>
                </div>
                <div className="self-stretch relative">
                  <select
                    {...register("sessionDay")}
                    className="w-full p-4 rounded-lg border border-[#e9e9ea] text-[#777980] text-sm font-normal   leading-[14px] appearance-none"
                  >
                    {weekDays.map((day) => (
                      <option key={day} value={day}>
                        {day}
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
              className="self-stretch h-14 px-[18px] py-3 bg-[#b60000] rounded-lg justify-center items-center gap-2.5 inline-flex mt-16 hover:bg-[#990000] transition-all duration-300 cursor-pointer"
            >
              <div className="text-white text-lg font-medium   leading-[27px]">
                Request Booking
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
            <PasswordModal onClose={() => setShowPasswordModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
