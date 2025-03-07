'use client'
import React from 'react'
import { EmailLogsApis } from '@/app/api/emaillogsApis';

export default function Logs() {
  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [emailLogs, setEmailLogs] = React.useState([]);

  // Set mounted state
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch email logs data
  React.useEffect(() => {
    if (!mounted) return;

    const fetchEmailLogs = async () => {
      try {
        setLoading(true);
        const response = await EmailLogsApis.getEmailLogs();
        console.log('Email Logs API Response:', response);
        
        if (response.success) {
          setEmailLogs(response.data || []);
        } else {
          console.error('API Error:', response.message);
          setError(response.message || 'Failed to fetch email logs');
        }
      } catch (err) {
        console.error('Email logs fetch error:', err);
        setError('Error fetching email logs');
      } finally {
        setLoading(false);
      }
    };

    fetchEmailLogs();
  }, [mounted]);

  return (
    <>
      <div className="w-full h-auto pl-6 py-6 bg-white rounded-xl flex-col justify-start items-start gap-4 inline-flex">
        <div className="w-full h-auto relative">
          <div className="w-full h-auto flex-col justify-start items-center gap-4 inline-flex">
            {/* Header */}
            <div className="w-full flex justify-between items-center">
              <div className="text-[#070707] text-2xl font-semibold  ">Email Logs</div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-lg">
              {loading ? (
                <div className="w-full h-32 flex items-center justify-center">
                  <div className="text-gray-500">Loading...</div>
                </div>
              ) : error ? (
                <div className="w-full h-32 flex items-center justify-center">
                  <div className="text-red-500">{error}</div>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#eceff3]">
                      <th className="p-4 text-left text-[#070707] text-base font-normal  ">List</th>
                      <th className="p-4 text-left text-[#070707] text-base font-normal  ">Name</th>
                      <th className="p-4 text-left text-[#070707] text-base font-normal  ">Email</th>
                      <th className="p-4 text-left text-[#070707] text-base font-normal  ">Subject</th>
                      <th className="p-4 text-left text-[#070707] text-base font-normal  ">Status</th>
                      <th className="p-4 text-left text-[#070707] text-base font-normal  ">Date</th>
                      <th className="p-4 text-left text-[#070707] text-base font-normal  ">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailLogs.map((item, index) => (
                      <tr key={item.id} className="border-b border-[#eaecf0]">
                        <td className="p-4 text-[#1d1f2c] text-sm font-normal  ">{index + 1}</td>
                        <td className="p-4 text-[#1d1f2c] text-base font-normal  ">{item.name}</td>
                        <td className="p-4 text-[#777980] text-base font-normal  ">{item.email}</td>
                        <td className="p-4 text-[#777980] text-base font-normal  ">{item.subject}</td>
                        <td className="p-4">
                          <div className={`h-[26px] pl-1.5 pr-2 py-1.5 ${item.status === 'sent' ? 'bg-green-100' : 'bg-[#fe5050]/10'} rounded-2xl border ${item.status === 'sent' ? 'border-green-300' : 'border-[#fe5050]'} justify-center items-center gap-1 flex`}>
                            <div className={`text-center ${item.status === 'sent' ? 'text-green-700' : 'text-[#fe5050]'} text-sm font-normal   leading-[14px]`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-[#777980] text-base font-normal  ">{item.date}</td>
                        <td className="p-4 text-[#777980] text-base font-normal  ">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
