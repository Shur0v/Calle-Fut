'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import icon1 from '@/public/dashboard/icon/icon7.svg';
import icon2 from '@/public/dashboard/icon/icon8.svg';
import icon3 from '@/public/dashboard/icon/icon9.svg';
import icon4 from '@/public/dashboard/icon/icon5.svg';
import eye from '@/public/dashboard/icon/eye.svg';
import mail from '@/public/dashboard/icon/mail.svg';
import ViewModal from './_components/viewmodal';
import MailModal from './_components/mailmodal';
import DashboardApis from '@/app/api/dashboardApis';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [isMailModalOpen, setIsMailModalOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [selectedStudents, setSelectedStudents] = React.useState([]);
  const [dashboardData, setDashboardData] = React.useState({
    students: [],
    statistics: {
      totalStudents: 0,
      activeStudents: 0,
      inactiveStudents: 0,
      totalBookingRequests: 0
    }
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const [ageFilter, setAgeFilter] = React.useState('All');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [filteredData, setFilteredData] = React.useState([]);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    if (!mounted) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await DashboardApis.getDashboardData();
        if (response.success) {
          setDashboardData({
            students: response.data.students || [],
            statistics: {
              totalStudents: response.data.totalStudents || 0,
              activeStudents: response.data.activeStudents || 0,
              inactiveStudents: response.data.inactiveStudents || 0,
              totalBookingRequests: response.data.totalBookingRequests || 0
            }
          });
          setFilteredData(response.data.students || []);
        } else {
          setError(response.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Error fetching dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [mounted]);

  // Filter function
  React.useEffect(() => {
    if (!mounted) return;
    
    let filtered = [...dashboardData.students];
    
    // Filter by age (compare as strings and remove "Years" from filter value)
    if (ageFilter !== 'All') {
      const filterAge = ageFilter.replace(' Years', '');
      filtered = filtered.filter(item => {
        const studentAge = String(item.age).replace(' Years', '');
        return studentAge === filterAge;
      });
    }
    
    // Filter by status (case-insensitive)
    if (statusFilter !== 'All') {
      filtered = filtered.filter(item => 
        item.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    setFilteredData(filtered);
    console.log('Filtered Data:', {
      ageFilter,
      statusFilter,
      originalLength: dashboardData.students.length,
      filteredLength: filtered.length,
      filtered
    });
  }, [ageFilter, statusFilter, dashboardData.students, mounted]);

  // Generate age options from actual data
  const generateAgeOptions = React.useCallback(() => {
    if (!dashboardData.students.length) return ['All'];
    
    // Extract unique ages and clean them
    const uniqueAges = [...new Set(dashboardData.students.map(item => {
      const age = String(item.age).replace(' Years', '');
      return `${age} Years`;
    }))];
    
    // Sort ages numerically
    uniqueAges.sort((a, b) => {
      const ageA = parseInt(a.replace(' Years', ''));
      const ageB = parseInt(b.replace(' Years', ''));
      return ageA - ageB;
    });
    
    return ['All', ...uniqueAges];
  }, [dashboardData.students]);

  const ageOptions = React.useMemo(() => generateAgeOptions(), [generateAgeOptions]);
  const statusOptions = ['All', 'Active', 'Inactive'];

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  const renderStatus = (status) => {
    const isActive = status.toLowerCase() === "active";
    return (
      <div className={`h-[26px] pl-1.5 pr-2 py-1.5 ${isActive ? 'bg-green-100' : 'bg-red-100'} rounded-2xl border ${isActive ? 'border-green-300' : 'border-red-300'} justify-center items-center gap-1 flex`}>
        <div className={`text-center ${isActive ? 'text-green-700' : 'text-red-700'} text-sm font-normal leading-[14px]`}>
          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </div>
      </div>
    );
  };

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleMailClick = (student) => {
    setSelectedStudent(student);
    setSelectedStudents([student]);
    setIsMailModalOpen(true);
  };

  const handleSendEmailAll = () => {
    setSelectedStudents(filteredData);
    setIsMailModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedStudent(null);
  };

  const handleCloseMailModal = () => {
    setIsMailModalOpen(false);
    setSelectedStudent(null);
    setSelectedStudents([]);
  };

  return (
    <>
      <div className="w-full flex flex-wrap justify-between items-center gap-6">
        <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-[122px] p-6 bg-white rounded-lg shadow-[0px_10px_24px_0px_rgba(13,18,36,0.05)] border border-[#f8f9fb] flex-col justify-start items-start gap-4">
          <div className="w-full flex justify-start items-start gap-4">
            <div data-svg-wrapper>
              <div className="w-[40px] h-[41px] relative">
                <div className="w-[40px] h-[40px] absolute top-[0.5px] left-0 bg-[#FFEFEF] rounded-[20px]" />
                <Image 
                  src={icon1}
                  alt="Total Students Icon"
                  width={20}
                  height={20}
                  className="absolute left-[10px] top-[10.5px]"
                />
              </div>
            </div>
            <div className="grow flex flex-col justify-start items-start gap-4">
              <div className="w-full h-5 rounded-lg flex justify-start items-center">
                <div className="text-[#777980] text-lg font-normal   whitespace-nowrap">Total Students</div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[#070707] text-xl font-medium  ">{dashboardData.statistics.totalStudents}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-[122px] p-6 bg-white rounded-lg shadow-[0px_10px_24px_0px_rgba(13,18,36,0.05)] border border-[#f8f9fb] flex-col justify-start items-start gap-4">
          <div className="w-full flex justify-start items-start gap-4">
            <div data-svg-wrapper>
              <div className="w-[40px] h-[41px] relative">
                <div className="w-[40px] h-[40px] absolute top-[0.5px] left-0 bg-[#FFEFEF] rounded-[20px]" />
                <Image 
                  src={icon2}
                  alt="Active Students Icon"
                  width={20}
                  height={20}
                  className="absolute left-[10px] top-[10.5px]"
                />
              </div>
            </div>
            <div className="grow flex flex-col justify-start items-start gap-4">
              <div className="w-full h-5 rounded-lg flex justify-start items-center">
                <div className="text-[#777980] text-lg font-normal   whitespace-nowrap">Active Students</div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[#070707] text-xl font-medium  ">{dashboardData.statistics.activeStudents}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-[122px] p-6 bg-white rounded-lg shadow-[0px_10px_24px_0px_rgba(13,18,36,0.05)] border border-[#f8f9fb] flex-col justify-start items-start gap-4">
          <div className="w-full flex justify-start items-start gap-4">
            <div data-svg-wrapper>
              <div className="w-[40px] h-[41px] relative">
                <div className="w-[40px] h-[40px] absolute top-[0.5px] left-0 bg-[#FFEFEF] rounded-[20px]" />
                <Image 
                  src={icon3}
                  alt="Inactive Students Icon"
                  width={20}
                  height={20}
                  className="absolute left-[10px] top-[10.5px]"
                />
              </div>
            </div>
            <div className="grow flex flex-col justify-start items-start gap-4">
              <div className="w-full h-5 rounded-lg flex justify-start items-center">
                <div className="text-[#777980] text-lg font-normal   whitespace-nowrap">Inactive Students</div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[#070707] text-xl font-medium  ">{dashboardData.statistics.inactiveStudents}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-[122px] p-6 bg-white rounded-lg shadow-[0px_10px_24px_0px_rgba(13,18,36,0.05)] border border-[#f8f9fb] flex-col justify-start items-start gap-4">
          <div className="w-full flex justify-start items-start gap-4">
            <div data-svg-wrapper>
              <div className="w-[40px] h-[41px] relative">
                <div className="w-[40px] h-[40px] absolute top-[0.5px] left-0 bg-[#FFEFEF] rounded-[20px]" />
                <Image 
                  src={icon4}
                  alt="Total Requested Icon"
                  width={20}
                  height={20}
                  className="absolute left-[10px] top-[10.5px]"
                />
              </div>
            </div>
            <div className="grow flex flex-col justify-start items-start gap-4">
              <div className="w-full h-5 rounded-lg flex justify-start items-center">
                <div className="text-[#777980] text-lg font-normal   whitespace-nowrap">Total Requested</div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[#070707] text-xl font-medium  ">{dashboardData.statistics.totalBookingRequests}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[608px] flex-col justify-start items-start gap-6 inline-flex mt-6">
        <div className="w-full h-auto pl-6 pr-6 py-6 bg-white rounded-xl flex-col justify-start items-start gap-4 flex">
          {/* Header with filters */}
          <div className="w-full flex justify-between items-center mb-6">
            <div className="text-[#070707] text-2xl font-semibold">Student List</div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                  className="h-10 px-4 py-2.5 rounded border border-[#dfe1e6] appearance-none pr-10 bg-white text-[#777980] text-base font-medium cursor-pointer"
                >
                  {ageOptions.map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.92778L10 12.9277L15 7.92773" stroke="#777980" strokeWidth="1.25" strokeMiterlimit="16" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 px-4 py-2.5 rounded border border-[#dfe1e6] appearance-none pr-10 bg-white text-[#777980] text-base font-medium cursor-pointer"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.92778L10 12.9277L15 7.92773" stroke="#777980" strokeWidth="1.25" strokeMiterlimit="16" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
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
                    <th className="p-4 text-left text-[#070707] text-base font-normal">List</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Name</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Age</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Email</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Join Date</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Time</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Status</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className="border-b border-[#eaecf0]">
                      <td className="p-4 text-[#1d1f2c] text-sm font-normal">{index + 1}</td>
                      <td className="p-4 text-[#1d1f2c] text-sm font-normal">{item.name}</td>
                      <td className="p-4 text-[#1d1f2c] text-sm font-normal">{item.age}</td>
                      <td className="p-4 text-[#1d1f2c] text-sm font-normal">{item.email}</td>
                      <td className="p-4 text-[#1d1f2c] text-sm font-normal">{item.joinDate}</td>
                      <td className="p-4 text-[#1d1f2c] text-sm font-normal">{item.time}</td>
                      <td className="p-4">{renderStatus(item.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Image 
                            src={eye} 
                            alt="View" 
                            width={16} 
                            height={17} 
                            className="cursor-pointer"
                            onClick={() => handleViewClick(item)}
                          />
                          <div className="w-[1px] h-5 bg-[#dfe1e6]"></div>
                          <Image 
                            src={mail} 
                            alt="mail" 
                            width={16} 
                            height={17} 
                            className="cursor-pointer"
                            onClick={() => handleMailClick(item)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Send Email All button */}
          <div className="self-stretch px-6 justify-end items-center gap-4 inline-flex mt-4">
            <button 
              className="px-[18px] py-3 bg-[#b60000] rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[#a00000] transition-colors"
              onClick={handleSendEmailAll}
              disabled={loading || filteredData.length === 0}
            >
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.66699 5.5L7.42784 8.76414C9.55166 9.9675 10.449 9.9675 12.5728 8.76414L18.3337 5.5" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
                <path d="M1.67916 11.73C1.73363 14.2847 1.76087 15.5619 2.70348 16.5082C3.64608 17.4543 4.95796 17.4872 7.58171 17.5532C9.19877 17.5938 10.7999 17.5938 12.417 17.5532C15.0408 17.4872 16.3526 17.4543 17.2953 16.5082C18.2378 15.5619 18.2651 14.2847 18.3195 11.73C18.3371 10.9086 18.3371 10.0921 18.3195 9.27066C18.2651 6.71604 18.2378 5.43873 17.2953 4.49254C16.3526 3.54635 15.0408 3.51339 12.417 3.44747C10.7999 3.40683 9.19877 3.40683 7.5817 3.44746C4.95796 3.51338 3.64608 3.54633 2.70347 4.49253C1.76087 5.43873 1.73363 6.71603 1.67915 9.27066C1.66163 10.0921 1.66164 10.9086 1.67916 11.73Z" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-base font-medium">Send Email All</span>
            </button>
          </div>
        </div>
      </div>

      <ViewModal 
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        data={selectedStudent}
      />
      <MailModal 
        isOpen={isMailModalOpen}
        onClose={handleCloseMailModal}
        selectedStudents={selectedStudents}
      />
    </>
  )
}
