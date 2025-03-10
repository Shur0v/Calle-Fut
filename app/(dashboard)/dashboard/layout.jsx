import React from 'react'
import Sidebar from './_components/sidebar'
import DashboardHeader from './_components/dashboard-header'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F5F7F9]">
      <DashboardHeader />
      <main className="md:ml-[280px] mt-[86px] p-6">
        {children}
      </main>
    </div>
  )
}
