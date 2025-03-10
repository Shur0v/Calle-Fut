import React from 'react'
import Sidebar from './_components/sidebar'
import DashboardHeader from './_components/dashboard-header'

export default function Layout({children}) {
  return (
    <div className='flex'>
        <div className='w-3/12 bg-[#FFFFFF] border-r border-[#E5E5E5]'>
            <Sidebar />
        </div>
        <div className='w-full'>
            <DashboardHeader />
            <div className='p-6 bg-[#F5F7F9] h-full'>
            {children}
            </div>
        </div>
    </div>
  )
}
