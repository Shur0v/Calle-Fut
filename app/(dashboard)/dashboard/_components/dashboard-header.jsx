'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import search from '@/public/dashboard/icon/search.svg';
import avatar from '@/public/dashboard/icon/avatar.png';

export default function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
        <div className="w-full h-[86px] px-6 py-5 bg-white justify-between items-center inline-flex">
  <div className="text-black text-[28px] font-medium   leading-7">Dashboard</div>
  <div className="h-[46px] justify-between items-center flex">
    <div className="w-[301px] h-[46px] mr-8 pl-3.5 pr-5 py-[11px] bg-white rounded-xl border border-[#e7e7e7] justify-start items-center gap-2.5 flex">
      <div data-svg-wrapper className="relative">
        <Image src={search} alt="search" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="w-full text-base font-normal leading-none focus:outline-none placeholder:text-[#b0b0b0]"
      />
    </div>
    <div className="h-10 justify-between items-center flex">
      <div className="justify-start items-center gap-4 flex">
        <Image 
          src={avatar} 
          alt="User avatar" 
          className="w-10 h-10 rounded-[159px] border border-[#ff9292]"
        />
        <div className="justify-start items-center gap-1 flex">
          <div className="text-black text-base font-medium">Coach Marco</div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
