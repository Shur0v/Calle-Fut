'use client'
import React from 'react'

export default function Logs() {
  const tableData = [
    { 
      id: 1, 
      name: "Jenny Wilson", 
      email: "abcd@gmail.com", 
      subject: "Welcome to our school",
      date: "16/02/2025",
      time: "4:00 pm"
    },
    { 
      id: 2, 
      name: "Kathryn Murphy", 
      email: "abcd@gmail.com", 
      subject: "Your attendance report",
      date: "16/02/2025",
      time: "3:30 pm"
    },
    { 
      id: 3, 
      name: "Dianne Russell", 
      email: "abcd@gmail.com", 
      subject: "Upcoming Exam Notice",
      date: "12/02/2025",
      time: "2:45 pm"
    },
    { 
      id: 4, 
      name: "Bessie Cooper", 
      email: "abcd@gmail.com", 
      subject: "Your Welcome Email",
      date: "16/02/2025",
      time: "1:15 pm"
    },
    { 
      id: 5, 
      name: "Jane Cooper", 
      email: "abcd@gmail.com", 
      subject: "Upcoming Exam Notice",
      date: "15/02/2025",
      time: "11:30 am"
    },
    { 
      id: 6, 
      name: "Arlene McCoy", 
      email: "abcd@gmail.com", 
      subject: "Your attendance report",
      date: "14/02/2025",
      time: "10:00 am"
    }
  ];

  return (
    <>
      <div className="w-full h-auto pl-6 py-6 bg-white rounded-xl flex-col justify-start items-start gap-4 inline-flex">
        <div className="w-full h-auto relative">
          <div className="w-full h-auto flex-col justify-start items-center gap-4 inline-flex">
            {/* Header */}
            <div className="w-full flex justify-between items-center">
              <div className="text-[#070707] text-2xl font-semibold font-['Montserrat']">Email Logs</div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#eceff3]">
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">List</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Name</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Email</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Subject</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Date</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item.id} className="border-b border-[#eaecf0]">
                      <td className="p-4 text-[#1d1f2c] text-sm font-normal font-['Montserrat']">{item.id}</td>
                      <td className="p-4 text-[#1d1f2c] text-base font-normal font-['Montserrat']">{item.name}</td>
                      <td className="p-4 text-[#777980] text-base font-normal font-['Montserrat']">{item.email}</td>
                      <td className="p-4 text-[#777980] text-base font-normal font-['Montserrat']">{item.subject}</td>
                      <td className="p-4 text-[#777980] text-base font-normal font-['Montserrat']">{item.date}</td>
                      <td className="p-4 text-[#777980] text-base font-normal font-['Montserrat']">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
