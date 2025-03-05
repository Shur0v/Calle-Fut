import React from 'react'
import Image from 'next/image';
import coach1 from '@/public/client/cch1.png';
import coach2 from '@/public/client/cch2.png';
import coachbg from '@/public/client/coachbg.png';

const coachesData = [
  {
    name: "Coach Marco",
    image: coach1,
    bio: `Coach Marco was born in Mendoza, Argentina and moved to Fort Worth Texas when he was 2.
Marco went to LD Bell highschool where graduated & won a district championship while
making first-team GA all-district tearn. He also played for Fc Dallas. where he played in major youth such as national league, state cups, Dallas cup, espn cup, and even
regional tournaments nationwide...`
  },
  {
    name: "Coach Cam",
    image: coach2,
    bio: `Coach Cam was born and raised in San Antonio, Texas. He honed his skills playing with the
Texans and SA City ECNL while having a standout career at Harlan High School. In 2021, he
captained the team to a district championship, earning individual accolades as First Team All-
State and All-District, and was also named a Southeast All-American. His success continued...`
  }
];

export default function OurCoaches() {
  return (
    <div className="bg-white relative">
      <div className="absolute top-0 right-0 w-[234px] h-[234px]">
        <Image 
          src={coachbg}
          alt="background pattern"
          width={234}
          height={234}
          className="object-contain spin-slow"
        />
      </div>
      <div className="container mx-auto max-w-[1324px] py-[100px] relative">
        <h1 className='text-center text-5xl font-bold mb-5'>Our Coaches</h1>
        <p className='text-center text-lg font-normal text-[#4A4C56] w-[869px] mx-auto mb-14'>
          Our team of certified and experienced soccer coaches is dedicated to helping young athletes develop their skills, improve fitness, and build confidence on and off the field.
        </p>

        <div className="grid grid-cols-2 gap-7 justify-center">
          {coachesData.map((coach, index) => (
            <div key={index} className="w-[648px] h-[593px] relative">
              <div className="w-[648px] h-[593px] left-0 top-0 absolute bg-gradient-to-b from-black to-black rounded-lg" />
              <Image
                src={coach.image}
                alt={coach.name}
                fill
                sizes="(max-width: 648px) 100vw, 648px"
                className="object-cover rounded-lg"
                priority={index === 0}
              />
              <div className="w-[600px] left-[24px] top-[428px] absolute justify-start items-center gap-4 inline-flex z-20">
                <div data-svg-wrapper>
                  <svg 
                    width="4" 
                    height="102" 
                    viewBox="0 0 4 102" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M1.81738 2L1.81738 100" 
                      stroke="#DB0000" 
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                  <div className="self-stretch text-white text-xl font-semibold   leading-tight">
                    {coach.name}
                  </div>
                  <div className="self-stretch text-white text-sm font-normal   leading-[21px]">
                    {coach.bio}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
