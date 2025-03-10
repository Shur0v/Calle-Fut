import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/client/logo.png'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi'

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
    icon: <FaFacebookF className="w-5 h-5 text-[#d2d2d5]" />
  },
  { 
    name: 'Instagram',
    link: 'https://instagram.com/untappedtalentacademy',
    icon: <FaInstagram className="w-5 h-5 text-[#d2d2d5]" />
  },
  { 
    name: 'Twitter',
    link: 'https://twitter.com/untappedtalentacademy',
    icon: <FaTwitter className="w-5 h-5 text-[#d2d2d5]" />
  }
]

const contactInfo = [
  {
    type: 'phone',
    value: '817-947-7424',
    link: 'tel:817-947-7424',
    icon: <HiPhone className="w-5 h-5 text-[#d2d2d5]" />
  },
  {
    type: 'email',
    value: 'untappedtalentacademy@gmail.com',
    link: 'mailto:untappedtalentacademy@gmail.com',
    icon: <HiMail className="w-5 h-5 text-[#d2d2d5]" />
  },
  {
    type: 'address',
    value: '4701 staggerbrush rd Austin, Texas 78749',
    link: 'https://maps.google.com/?q=4701+staggerbrush+rd+Austin,+Texas+78749',
    icon: <HiLocationMarker className="w-5 h-5 text-[#d2d2d5]" />
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
    <div className="w-full flex flex-col justify-start items-center bg-[#520000]">
      {/* Main Footer Content */}
      <div className="w-full max-w-[1920px] px-4 md:px-8 lg:px-[300px] pt-20 pb-[50px] flex flex-col md:flex-row justify-center items-start gap-8 md:gap-[88px]">
        {/* Logo and Description */}
        <div className="w-full md:w-[538px] flex flex-col justify-start items-start gap-5">
          <a 
            href="#home" 
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className="w-[65.30px] h-16 relative"
          >
            <Image src={logo} alt="Logo" width={64} height={64} className="w-16 h-16" />
          </a>
          <div className="text-[#d2d2d5] text-base font-normal leading-normal">
            At our Academy, we believe every player has unique talents, and no athlete is ever •not good enough. We're committed to providing a supportive and encouraging environment where each player
            can thrive and become the best version of themselves.
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full md:w-auto flex flex-wrap justify-start items-start gap-10">
          {/* Quick Links */}
          <div className="w-[150px] flex flex-col justify-start items-start gap-6">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="text-white text-2xl font-semibold leading-normal">Quick Links</div>
              <div className="w-[115px] h-[0px] border border-[#d2d2d5]" />
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  onClick={(e) => handleSmoothScroll(e, link.link)}
                  className="text-[#d2d2d5] text-base font-medium leading-none hover:text-white transition-colors cursor-pointer"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div className="w-[145px] flex flex-col justify-start items-start gap-6">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="text-white text-2xl font-semibold leading-normal">Follow Us</div>
              <div className="w-[115px] h-[0px] border border-[#d2d2d5]" />
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
              {socialMedia.map((social, index) => (
                <a 
                  key={index} 
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-start items-center gap-2 text-[#d2d2d5] hover:text-white transition-colors"
                >
                  {social.icon}
                  <div className="text-base font-medium leading-none">
                    {social.name}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info - Updated width and removed w-full */}
          <div className="w-[335px] flex flex-col justify-start items-start gap-6">
            <div className="flex flex-col justify-start items-start gap-3">
              <div className="text-white text-2xl font-semibold leading-normal">Contact Info</div>
              <div className="w-[115px] h-[0px] border border-[#d2d2d5]" />
            </div>
            <div className="flex flex-col justify-start items-start gap-3">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${info.type === 'address' ? 'min-h-[42px]' : 'h-5'} flex justify-start items-center gap-3 text-[#d2d2d5] hover:text-white transition-colors`}
                >
                  {info.icon}
                  <div className={`text-base font-medium ${info.type === 'address' ? 'leading-tight' : 'leading-none'}`}>
                    {info.value}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-white/50">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[#e9e9ea] text-lg font-normal leading-[18px]">
            @2025 KickStart Kids Soccer. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <FaInstagram className="w-5 h-5 text-[#d2d2d5]" />
            <div className="text-[#d2d2d5] text-base font-medium leading-none">
              Keep up with our socials! @untappedtalentacademy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}