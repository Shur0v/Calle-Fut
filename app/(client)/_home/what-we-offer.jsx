import React from 'react'
import Image from "next/image";
import wwobg from "@/public/client/wwobg.png";

const trainingData = [
  {
    title: "Personalized 1-on-1 Training",
    subtitle: "Tailored to Your Needs!",
    features: [
      "High-level, individualized training plans-",
      "Custom progress reports to track your improvement.",
      { text: "FREE evaluation session", highlight: " to get started!" }
    ],
    packages: [
      { sessions: 3, price: 200 },
      { sessions: 5, price: 300 },
      { sessions: 10, price: 500 }
    ]
  },
  {
    title: "Group Training Sessions",
    subtitle: "Train with Friends!",
    features: [
      "Small group training sessions",
      "Competitive team environment",
      { text: "Flexible scheduling", highlight: " for your convenience!" }
    ],
    packages: [
      { sessions: 3, price: 150 },
      { sessions: 5, price: 250 },
      { sessions: 10, price: 400 }
    ]
  }
];

export default function WhatweOffer() {
  return (
    <div className="w-full bg-[#f8f8f8] relative">
      {/* Top Right Background Image */}
      <div className="absolute top-0 right-0">
        <Image 
          src={wwobg}
          alt="Background pattern"
          width={234}
          height={234}
          priority
        />
      </div>

      <div className="container mx-auto max-w-[1324px] py-[100px]">
        <h1 className='text-5xl font-bold text-center text-[#070707] mb-14'>
          Elevate Your Game with Expert Training!
        </h1>

        <div className="grid grid-cols-2 gap-7 justify-center">
          {trainingData.map((card, index) => (
            <div key={index} className="w-[648px] h-auto p-10 bg-white rounded-lg flex-col justify-start items-start gap-6 inline-flex">
              <div className="self-stretch text-[#070707] text-2xl font-semibold   leading-normal">{card.title}</div>
              <div className="self-stretch h-[342.50px] flex-col justify-start items-start gap-4 flex">
                <div className="h-[126.50px] flex-col justify-start items-start gap-[18px] flex">
                  <div className="self-stretch text-[#4a4c56] text-xl font-medium   leading-tight">{card.subtitle}</div>
                  <div className="self-stretch h-[88.50px] flex-col justify-start items-start gap-3 flex">
                    {card.features.map((feature, idx) => (
                      <div key={idx} className="justify-start items-center gap-3 inline-flex">
                        <div data-svg-wrapper>
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10.75C0 16.687 4.81293 21.5 10.75 21.5C16.687 21.5 21.5 16.687 21.5 10.75C21.5 8.6396 20.8918 6.67124 19.8412 5.01059C19.6966 4.78196 19.6243 4.66764 19.4956 4.6437C19.3669 4.61976 19.2578 4.70084 19.0395 4.86299C18.5988 5.1903 18.1511 5.56511 17.7013 5.97836C16.5365 7.04852 15.4141 8.32354 14.4293 9.56023C13.4465 10.7944 12.6131 11.9749 12.025 12.8476C11.7314 13.2834 11.4998 13.6412 11.3423 13.8888C11.2636 14.0127 11.2035 14.1089 11.1634 14.1734L11.1186 14.2461L11.1078 14.2637L11.1054 14.2676C10.9217 14.5704 10.5911 14.7543 10.237 14.7497C9.88284 14.7451 9.55754 14.5534 9.38174 14.2459C8.43252 12.5847 7.64836 11.8368 7.17653 11.5065C6.94207 11.3424 6.78257 11.2797 6.71242 11.2574C6.70822 11.256 6.70613 11.2554 6.69819 11.2533C6.69119 11.2515 6.67946 11.249 6.67233 11.2478C6.66424 11.2465 6.65562 11.2455 6.63836 11.2436C6.13862 11.1881 5.75 10.7643 5.75 10.2497C5.75 9.69753 6.19771 9.24973 6.75 9.24973C6.82902 9.24103 7.05342 9.24913 7.31882 9.35153C7.59242 9.43863 7.93292 9.59463 8.32346 9.86803C8.85274 10.2385 9.46894 10.8207 10.1395 11.7338C10.1962 11.811 10.3129 11.8095 10.3664 11.73C10.9751 10.8267 11.8402 9.60093 12.8647 8.31435C13.8873 7.03018 15.081 5.66978 16.3482 4.50558C16.7572 4.12986 17.1799 3.76881 17.6128 3.43463C17.8889 3.22151 18.027 3.11496 18.0299 2.97138C18.0329 2.82781 17.908 2.72298 17.6583 2.51333C15.79 0.9447 13.3803 0 10.75 0C4.81293 0 0 4.81293 0 10.75Z" fill="#B60000"/>
                          </svg>
                        </div>
                        <div className="text-center">
                          {typeof feature === 'string' ? (
                            <span className="text-[#4a4c56] text-base font-normal   leading-tight">{feature}</span>
                          ) : (
                            <>
                              <span className="text-[#4a4c56] text-base font-semibold   leading-tight">{feature.text}</span>
                              <span className="text-[#4a4c56] text-base font-normal   leading-tight">{feature.highlight}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="self-stretch h-[200px] px-10 py-8 bg-[#f7f7f7] rounded-xl flex-col justify-center items-start gap-5 flex mt-4">
                  <div className="text-[#070707] text-2xl font-semibold   leading-normal">Packages</div>
                  <div className="self-stretch h-[92px] flex-col justify-center items-start gap-4 flex">
                    {card.packages.map((pkg, idx) => (
                      <div key={idx} className="self-stretch">
                        <span className="text-[#1d1f2c] text-xl font-normal   leading-tight">{pkg.sessions} Sessions:</span>
                        <span className="text-[#1d1f2c] text-xl font-medium   leading-tight"> </span>
                        <span className="text-[#b60000] text-xl font-medium   leading-tight">${pkg.price}</span>
                      </div>
                    ))}
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
