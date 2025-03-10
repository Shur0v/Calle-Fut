"use client"
import React, { useState } from "react";

// Remove duplicate review and keep unique ones
const reviewsData = [
  {
    name: "Sarah M.",
    role: "Parent of 9-years-old",
    review: "My son joined the personalized 1:1 training program, and I couldn't be happier! The 1-on-1 coaching helped him improve his dribbling and confidence on the field. The trainer was amazing with kids, and the fitness exercises were so much fun for him. He looks forward to every session and even practices at home now. Highly recommend!"
  },
  {
    name: "John D.", 
    role: "Parent of 11-years-old",
    review: "The training program has been transformative for my daughter. The coaches are patient, skilled, and know exactly how to bring out the best in young players. The improvement in her technique and game understanding has been remarkable. We're extremely satisfied with the results!"
  },
  {
    name: "Michael R.",
    role: "Parent of 8-years-old", 
    review: "Exceptional training program! My son's soccer skills have improved dramatically. The coaches create a fun, encouraging environment while maintaining professional standards. The personalized attention has helped build both his skills and confidence. Highly recommended for any young player!"
  },
  {
    name: "Jennifer P.",
    role: "Parent of 13-years-old",
    review: "The coaches here truly understand youth development. My teenager has grown not just as a player, but as a person. The technical drills are challenging yet engaging, and the tactical awareness sessions have given her a deeper understanding of the game."
  },
  {
    name: "David K.",
    role: "Parent of 7-years-old",
    review: "As a former player myself, I'm impressed by the quality of coaching. They break down complex skills into manageable steps for young kids. My son has developed proper technique from the start, which is crucial at his age. The positive reinforcement approach works wonders!"
  },
  {
    name: "Maria G.",
    role: "Parent of 10-years-old",
    review: "What sets this program apart is the individual attention. The coaches identified my daughter's strengths and areas for improvement immediately. They tailored the training to address her specific needs. Her ball control and shooting accuracy have improved tremendously."
  },
  {
    name: "Robert T.",
    role: "Parent of 12-years-old",
    review: "The progress tracking system is fantastic! We receive regular updates on our son's development, with specific feedback and areas to work on. The coaches are always available to discuss his progress, and the structured development plan gives clear goals to work towards."
  },
  {
    name: "Lisa H.",
    role: "Parent of 15-years-old",
    review: "Finding quality training for teenage players can be challenging, but this program exceeds expectations. The advanced tactical sessions and position-specific training have helped my son compete at a higher level. The coaches' professional experience really shows."
  },
  {
    name: "James W.",
    role: "Parent of 6-years-old",
    review: "Perfect introduction to soccer for young kids! The coaches make learning fun while teaching proper fundamentals. My daughter was initially shy but now can't wait for training days. The small group sizes ensure every child gets attention."
  },
  {
    name: "Amanda C.",
    role: "Parent of 14-years-old",
    review: "The specialized goalkeeper training has been invaluable for my son. The technical aspects combined with decision-making exercises have dramatically improved his performance. The coaches understand the unique demands of the position and provide excellent guidance."
  },
  {
    name: "Thomas B.",
    role: "Parent of 16-years-old",
    review: "The college preparation aspect of the program is outstanding. The coaches helped my daughter refine her skills while also providing guidance on college recruitment. Their connections and knowledge of the process have been incredibly helpful."
  }
];

export default function Reviews() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevClick = () => {
    setCurrentSlide((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev + 1) % reviewsData.length);
  };

  // Improved progress bar calculations
  const progressBarWidth = 605.79;
  const totalSlides = reviewsData.length - 1; // Subtract 1 for zero-based index
  const indicatorWidth = 127.35; // Fixed width as per original design
  const maxOffset = progressBarWidth - indicatorWidth;
  const currentPosition = (currentSlide / totalSlides) * maxOffset;

  return (
    <>
      <div className="container mx-auto max-w-[1324px] py-[100px]">
        <h1 className="text-center text-5xl font-bold mb-5 w-[1212px] mx-auto mb-10">
          {" "}
          We let our work speak for itself, see what our past players/parents
          have to say about us.
        </h1>

        <div className="h-[344px] flex-col justify-start items-center gap-6 inline-flex">
          <div className="self-stretch h-72 p-8 bg-[#ffefef] rounded-tr-lg rounded-br-lg flex-col justify-center items-center gap-3 flex">
            <div className="self-stretch h-56 flex-col justify-center items-center gap-5 flex">
              <div className="h-[60px] flex-col justify-center items-start gap-3 flex">
                <div className="text-right text-[#070707] text-[32px] font-semibold   leading-loose">
                  {reviewsData[currentSlide].name}
                </div>
                <div className="text-[#4a4c56] text-base font-normal   leading-none">
                  {reviewsData[currentSlide].role}
                </div>
              </div>
              <div className="self-stretch text-center text-[#4a4c56] text-2xl font-normal   leading-9">
                {reviewsData[currentSlide].review}
              </div>
            </div>
          </div>
          <div className="w-[718px] justify-start items-center gap-6 inline-flex">
            <button 
              onClick={handlePrevClick} 
              className="relative cursor-pointer transition-transform hover:scale-105"
            >
              <svg
                width="34"
                height="33"
                viewBox="0 0 34 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.1724 2.16602C9.08037 2.16602 2.52051 8.58327 2.52051 16.4994C2.52051 24.4155 9.08037 30.8327 17.1724 30.8327C25.2644 30.8327 31.8242 24.4155 31.8242 16.4994C31.8242 8.58327 25.2644 2.16602 17.1724 2.16602ZM18.834 8.99976L13.3821 15.6664L12.701 16.4994L13.3821 17.3323L18.834 23.999L20.9626 22.3331L16.1918 16.4994L20.9625 10.6656L18.834 8.99976Z"
                  fill="#FFDCDC"
                  className="hover:fill-[#b60000] transition-colors"
                />
              </svg>
            </button>
            <div className="w-[606px] h-2.5 relative">
              <div className="w-[605.79px] h-[10.10px] left-0 top-0 absolute bg-[#ffefef] rounded-[32px]" />
              <div 
                className="h-[10.06px] absolute bg-[#b60000] rounded-[26px] transition-all duration-300 ease-in-out"
                style={{
                  width: `${indicatorWidth}px`,
                  left: `${currentPosition}px`,
                  top: "0.04px"
                }}
              />
            </div>
            <button 
              onClick={handleNextClick} 
              className="relative cursor-pointer transition-transform hover:scale-105"
            >
              <svg
                width="34"
                height="33"
                viewBox="0 0 34 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.8843 2.16602C24.9763 2.16602 31.5361 8.58327 31.5361 16.4994C31.5361 24.4155 24.9763 30.8327 16.8843 30.8327C8.79223 30.8327 2.23243 24.4155 2.23243 16.4994C2.23243 8.58327 8.79223 2.16602 16.8843 2.16602ZM15.2227 8.99976L20.6745 15.6664L21.3556 16.4994L20.6745 17.3323L15.2227 23.999L13.094 22.3331L17.8648 16.4994L13.0942 10.6656L15.2227 8.99976Z"
                  fill="#B60000"
                  className="hover:fill-[#990000] transition-colors"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
