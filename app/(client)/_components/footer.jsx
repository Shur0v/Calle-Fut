import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/client/logo.png'

const quickLinks = [
  { title: 'Home', link: '#home' },
  { title: 'What we offer', link: '#what-we-offer' },
  { title: 'Our coaches', link: '#our-coaches' },
  { title: 'Book a session', link: '#book-a-session' }
]

const socialMedia = [
  { 
    name: 'Facebook', 
    link: 'https://facebook.com/untappedtalentacademy',
    icon: (
      <div className="w-5 h-5 relative">
        <div className="w-[15.83px] h-[15.83px] left-[2.08px] top-[2.08px] absolute border border-[#d2d2d5]" />
        <div className="w-[5.70px] h-[11.17px] left-[8.40px] top-[6.69px] absolute border border-[#d2d2d5]" />
      </div>
    )
  },
  { 
    name: 'Instagram',
    link: 'https://instagram.com/untappedtalentacademy',
    icon: (
      <div className="w-5 h-5 relative">
        <div className="w-[15.83px] h-[15.83px] left-[2.08px] top-[2.08px] absolute border border-[#d2d2d5]" />
        <div className="w-[7.50px] h-[7.50px] left-[6.25px] top-[6.25px] absolute border border-[#d2d2d5]" />
        <div className="w-[0.01px] h-[0px] left-[14.58px] top-[5.42px] absolute border-2 border-[#d2d2d5]" />
      </div>
    )
  },
  { 
    name: 'Twitter',
    link: 'https://twitter.com/untappedtalentacademy',
    icon: (
      <div className="w-5 h-5 relative">
        <div className="w-[15px] h-[15px] left-[2.50px] top-[2.50px] absolute border border-[#d2d2d5]" />
      </div>
    )
  }
]

const contactInfo = [
  {
    type: 'phone',
    value: '817-947-7424',
    link: 'tel:817-947-7424',
    icon: (
      <div className="w-5 h-5 relative">
        <div className="w-[16.67px] h-[16.67px] left-[1.67px] top-[1.67px] absolute border border-[#d2d2d5]" />
      </div>
    )
  },
  {
    type: 'email',
    value: 'untappedtalentacademy@gmail.com',
    link: 'mailto:untappedtalentacademy@gmail.com',
    icon: (
      <div className="w-5 h-5 relative">
        <div className="w-[16.67px] h-[4.17px] left-[1.67px] top-[5px] absolute border border-[#d2d2d5]" />
        <div className="w-[16.67px] h-[14.17px] left-[1.67px] top-[2.92px] absolute border border-[#d2d2d5]" />
      </div>
    )
  },
  {
    type: 'address',
    value: '4701 staggerbrush rd Austin, Texas 78749',
    link: 'https://maps.google.com/?q=4701+staggerbrush+rd+Austin,+Texas+78749',
    icon: (
      <div className="w-5 h-5 relative">
        <div className="w-[4.17px] h-[4.17px] left-[7.92px] top-[5.42px] absolute border border-[#d2d2d5]" />
        <div className="w-[13.33px] h-[4.17px] left-[3.33px] top-[14.17px] absolute border border-[#d2d2d5]" />
        <div className="w-[11.67px] h-[13.33px] left-[4.17px] top-[1.67px] absolute border border-[#d2d2d5]" />
      </div>
    )
  }
]

export default function Footer() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <div className="w-[1920px] h-[392px] inline-flex flex-col justify-start items-start">
        <div className="self-stretch h-[310px] px-[300px] pt-20 pb-[50px] bg-[#520000] inline-flex justify-start items-center gap-[88px]">
          <div className="w-[538px] h-[180px] inline-flex flex-col justify-start items-start gap-5">
            <a 
              href="#home" 
              onClick={(e) => handleSmoothScroll(e, '#home')}
              className="w-[65.30px] h-16 relative"
            >
              <Image src={logo} alt="Logo" width={64} height={64} className="w-16 h-16" />
            </a>
            <div className="relative justify-start text-[#d2d2d5] text-base font-normal font-['Montserrat'] leading-normal">
              At our Academy, we believe every player has unique talents, and no athlete is ever •not good enough. We're committed to providing a supportive and encouraging environment where each player
              can thrive and become the best version of themselves.
            </div>
          </div>
          <div className="h-[172px] flex justify-start items-start gap-10">
            <div className="w-[150px] h-[172px] inline-flex flex-col justify-start items-center gap-6">
              <div className="self-stretch h-9 flex flex-col justify-start items-start gap-3">
                <div className="relative justify-start text-white text-2xl font-semibold font-['Montserrat'] leading-normal">Quick Links</div>
                <div className="w-[115px] h-[0px] relative border border-[#d2d2d5]" />
              </div>
              <div className="self-stretch h-28 flex flex-col justify-start items-start gap-4">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    onClick={(e) => handleSmoothScroll(e, link.link)}
                    className="relative justify-start text-[#d2d2d5] text-base font-medium font-['Montserrat'] leading-none hover:text-white transition-colors cursor-pointer"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="w-[145px] h-[152px] inline-flex flex-col justify-start items-start gap-6">
              <div className="self-stretch h-9 flex flex-col justify-start items-start gap-3">
                <div className="relative justify-start text-white text-2xl font-semibold font-['Montserrat'] leading-normal">Follow Us</div>
                <div className="w-[115px] h-[0px] relative border border-[#d2d2d5]" />
              </div>
              <div className="w-[122px] h-[92px] flex flex-col justify-start items-start gap-4">
                {socialMedia.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-stretch h-5 inline-flex justify-start items-center gap-2 text-[#d2d2d5] hover:text-white transition-colors"
                  >
                    {social.icon}
                    <div className="relative justify-start text-base font-medium font-['Montserrat'] leading-none">
                      {social.name}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="w-[335px] h-[166px] inline-flex flex-col justify-start items-start gap-6">
              <div className="h-9 flex flex-col justify-start items-start gap-3">
                <div className="relative justify-start text-white text-2xl font-semibold font-['Montserrat'] leading-normal">Contact Info</div>
                <div className="w-[115px] h-[0px] relative border border-[#d2d2d5]" />
              </div>
              <div className="self-stretch h-[106px] flex flex-col justify-start items-start gap-3">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${info.type === 'address' ? 'self-stretch h-[42px]' : 'h-5'} inline-flex justify-start items-center gap-3 text-[#d2d2d5] hover:text-white transition-colors`}
                  >
                    {info.icon}
                    <div className={`relative justify-start text-base font-medium font-['Montserrat'] ${info.type === 'address' ? 'leading-tight w-[264.32px]' : 'leading-none'}`}>
                      {info.value}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[82px] px-2.5 py-8 bg-[#520000] border border-white/50 inline-flex justify-center items-center gap-2.5">
          <div className="w-[1320px] h-[18px] flex justify-between items-center">
            <div className="relative justify-start text-[#e9e9ea] text-lg font-normal font-['Montserrat'] leading-[18px]">@2025 KickStart Kids Soccer. All rights reserved.</div>
            <div className="h-[18px] flex justify-start items-center gap-2">
              <div className="w-5 h-5 relative">
                <div className="w-[15.83px] h-[15.83px] left-[2.08px] top-[2.08px] absolute border border-[#d2d2d5]" />
                <div className="w-[7.50px] h-[7.50px] left-[6.25px] top-[6.25px] absolute border border-[#d2d2d5]" />
                <div className="w-[0.01px] h-[0px] left-[14.58px] top-[5.42px] absolute border-2 border-[#d2d2d5]" />
              </div>
              <div className="relative justify-start text-[#d2d2d5] text-base font-medium font-['Montserrat'] leading-none">Keep up with our socials! @untappedtalentacademy</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
