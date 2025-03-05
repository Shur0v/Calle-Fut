'use client'
import React from 'react'
import Image from 'next/image';
import icon1 from '@/public/dashboard/icon/icon7.svg';
import icon2 from '@/public/dashboard/icon/icon8.svg';
import icon3 from '@/public/dashboard/icon/icon9.svg';
import icon4 from '@/public/dashboard/icon/icon5.svg';
import eye from '@/public/dashboard/icon/eye.svg';
import mail from '@/public/dashboard/icon/mail.svg';

export default function Dashboard() {
  const tableData = [
    { id: 1, name: "Jenny Wilson", age: "16 Years", email: "abcd@gmail.com", joinDate: "16/02/2025", time: "4:00 pm", status: "Active" },
    { id: 2, name: "Robert Fox", age: "18 Years", email: "robert@gmail.com", joinDate: "15/02/2025", time: "3:30 pm", status: "Inactive" },
    { id: 3, name: "Wade Warren", age: "17 Years", email: "wade@gmail.com", joinDate: "14/02/2025", time: "2:45 pm", status: "Active" },
    { id: 4, name: "Esther Howard", age: "19 Years", email: "esther@gmail.com", joinDate: "13/02/2025", time: "1:15 pm", status: "Active" },
    { id: 5, name: "Leslie Alexander", age: "16 Years", email: "leslie@gmail.com", joinDate: "12/02/2025", time: "11:30 am", status: "Inactive" },
    { id: 6, name: "Cameron Williamson", age: "11 Years", email: "cameron@gmail.com", joinDate: "11/02/2025", time: "10:00 am", status: "Active" },
    { id: 7, name: "Guy Hawkins", age: "12 Years", email: "guy@gmail.com", joinDate: "10/02/2025", time: "9:45 am", status: "Inactive" },
    { id: 8, name: "Kathryn Murphy", age: "13 Years", email: "kathryn@gmail.com", joinDate: "09/02/2025", time: "9:30 am", status: "Active" },
    { id: 9, name: "Dianne Russell", age: "14 Years", email: "dianne@gmail.com", joinDate: "08/02/2025", time: "8:30 am", status: "Active" },
    { id: 10, name: "Floyd Miles", age: "15 Years", email: "floyd@gmail.com", joinDate: "07/02/2025", time: "8:00 am", status: "Inactive" },
    { id: 11, name: "Annette Black", age: "11 Years", email: "annette@gmail.com", joinDate: "06/02/2025", time: "7:45 am", status: "Active" },
    { id: 12, name: "Jacob Jones", age: "12 Years", email: "jacob@gmail.com", joinDate: "05/02/2025", time: "7:30 am", status: "Inactive" },
    { id: 13, name: "Kristin Watson", age: "13 Years", email: "kristin@gmail.com", joinDate: "04/02/2025", time: "7:15 am", status: "Active" },
    { id: 14, name: "Savannah Nguyen", age: "14 Years", email: "savannah@gmail.com", joinDate: "03/02/2025", time: "6:45 am", status: "Active" },
    { id: 15, name: "Courtney Henry", age: "15 Years", email: "courtney@gmail.com", joinDate: "02/02/2025", time: "6:30 am", status: "Inactive" },
    { id: 16, name: "Jerome Bell", age: "16 Years", email: "jerome@gmail.com", joinDate: "01/02/2025", time: "6:15 am", status: "Active" },
    { id: 17, name: "Bessie Cooper", age: "17 Years", email: "bessie@gmail.com", joinDate: "31/01/2025", time: "6:00 am", status: "Inactive" },
    { id: 18, name: "Ralph Edwards", age: "18 Years", email: "ralph@gmail.com", joinDate: "30/01/2025", time: "5:45 am", status: "Active" },
    { id: 19, name: "Marvin McKinney", age: "19 Years", email: "marvin@gmail.com", joinDate: "29/01/2025", time: "5:30 am", status: "Active" },
    { id: 20, name: "Eleanor Pena", age: "11 Years", email: "eleanor@gmail.com", joinDate: "28/01/2025", time: "5:15 am", status: "Inactive" },
    { id: 21, name: "Arlene McCoy", age: "12 Years", email: "arlene@gmail.com", joinDate: "27/01/2025", time: "5:00 am", status: "Active" },
    { id: 22, name: "Devon Lane", age: "13 Years", email: "devon@gmail.com", joinDate: "26/01/2025", time: "4:45 am", status: "Inactive" },
    { id: 23, name: "Ronald Richards", age: "14 Years", email: "ronald@gmail.com", joinDate: "25/01/2025", time: "4:30 am", status: "Active" },
    { id: 24, name: "Maggie Pierce", age: "15 Years", email: "maggie@gmail.com", joinDate: "24/01/2025", time: "4:15 am", status: "Active" },
    { id: 25, name: "Hannah Miles", age: "16 Years", email: "hannah@gmail.com", joinDate: "23/01/2025", time: "4:00 am", status: "Inactive" },
    { id: 26, name: "Lucas Kim", age: "17 Years", email: "lucas@gmail.com", joinDate: "22/01/2025", time: "3:45 am", status: "Active" },
    { id: 27, name: "Ava Cooper", age: "18 Years", email: "ava@gmail.com", joinDate: "21/01/2025", time: "3:30 am", status: "Inactive" },
    { id: 28, name: "Sophia Reed", age: "19 Years", email: "sophia@gmail.com", joinDate: "20/01/2025", time: "3:15 am", status: "Active" },
    { id: 29, name: "Ethan Ross", age: "11 Years", email: "ethan@gmail.com", joinDate: "19/01/2025", time: "3:00 am", status: "Active" },
    { id: 30, name: "Mia Baker", age: "12 Years", email: "mia@gmail.com", joinDate: "18/01/2025", time: "2:45 am", status: "Inactive" },
    { id: 31, name: "Noah Gray", age: "13 Years", email: "noah@gmail.com", joinDate: "17/01/2025", time: "2:30 am", status: "Active" },
    { id: 32, name: "Zoe Simmons", age: "14 Years", email: "zoe@gmail.com", joinDate: "16/01/2025", time: "2:15 am", status: "Active" },
    { id: 33, name: "Nathan Bell", age: "15 Years", email: "nathan@gmail.com", joinDate: "15/01/2025", time: "2:00 am", status: "Inactive" },
    { id: 34, name: "Isabella Carter", age: "16 Years", email: "isabella@gmail.com", joinDate: "14/01/2025", time: "1:45 am", status: "Active" },
    { id: 35, name: "Liam Green", age: "17 Years", email: "liam@gmail.com", joinDate: "13/01/2025", time: "1:30 am", status: "Inactive" },
  ];

  const [ageFilter, setAgeFilter] = React.useState('All');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [filteredData, setFilteredData] = React.useState(tableData);

  // Dynamically generate age options from tableData
  const generateAgeOptions = () => {
    // Extract all ages and convert them to numbers
    const ages = tableData.map(item => parseInt(item.age));
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);
    
    // Generate array of all ages between min and max
    const ageOptions = ['All'];
    for (let age = minAge; age <= maxAge; age++) {
      ageOptions.push(`${age} Years`);
    }
    return ageOptions;
  };

  const ageOptions = generateAgeOptions();
  const statusOptions = ['All', 'Active', 'Inactive'];

  // Filter function
  React.useEffect(() => {
    let filtered = [...tableData];
    
    if (ageFilter !== 'All') {
      filtered = filtered.filter(item => item.age === ageFilter);
    }
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    setFilteredData(filtered);
  }, [ageFilter, statusFilter]);

  const renderStatus = (status) => {
    const isActive = status === "Active";
    return (
      <div className={`h-[26px] pl-1.5 pr-2 py-1.5 ${isActive ? 'bg-[#38c976]/10' : 'bg-[#fe5050]/10'} rounded-2xl border ${isActive ? 'border-[#abefc6]' : 'border-[#fe5050]'} justify-center items-center gap-1 flex`}>
        <div className={`text-center ${isActive ? 'text-[#067647]' : 'text-[#fe5050]'} text-sm font-normal   leading-[14px]`}>
          {status}
        </div>
      </div>
    );
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
                <div className="text-[#070707] text-xl font-medium  ">1,250</div>
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
                <div className="text-[#070707] text-xl font-medium  ">600</div>
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
                <div className="text-[#070707] text-xl font-medium  ">350</div>
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
                <div className="text-[#070707] text-xl font-medium  ">300</div>
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
            <table className="w-full">
              <thead>
                <tr className="bg-[#eceff3]">
                  <th className="p-4 text-left text-[#070707] text-base font-normal ">List</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal ">Name</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal ">Age</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal ">Email</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal ">Join Date</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal ">Time</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal ">Status</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal ">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b border-[#eaecf0]">
                    <td className="p-4 text-[#1d1f2c] text-sm font-normal ">{item.id}</td>
                    <td className="p-4 text-[#1d1f2c] text-sm font-normal ">{item.name}</td>
                    <td className="p-4 text-[#1d1f2c] text-sm font-normal ">{item.age}</td>
                    <td className="p-4 text-[#1d1f2c] text-sm font-normal ">{item.email}</td>
                    <td className="p-4 text-[#1d1f2c] text-sm font-normal ">{item.joinDate}</td>
                    <td className="p-4 text-[#1d1f2c] text-sm font-normal ">{item.time}</td>
                    <td className="p-4">{renderStatus(item.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image src={eye} alt="View" width={16} height={17} />
                        <div className="w-[1px] h-5 bg-[#dfe1e6]"></div>
                        <Image src={mail} alt="mail" width={16} height={17} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Send Email All button */}
          <div className="self-stretch px-6 justify-end items-center gap-4 inline-flex mt-4">
            <button className="px-[18px] py-3 bg-[#b60000] rounded-lg flex items-center gap-1.5">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.66699 5.5L7.42784 8.76414C9.55166 9.9675 10.449 9.9675 12.5728 8.76414L18.3337 5.5" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
                <path d="M1.67916 11.73C1.73363 14.2847 1.76087 15.5619 2.70348 16.5082C3.64608 17.4543 4.95796 17.4872 7.58171 17.5532C9.19877 17.5938 10.7999 17.5938 12.417 17.5532C15.0408 17.4872 16.3526 17.4543 17.2953 16.5082C18.2378 15.5619 18.2651 14.2847 18.3195 11.73C18.3371 10.9086 18.3371 10.0921 18.3195 9.27066C18.2651 6.71604 18.2378 5.43873 17.2953 4.49254C16.3526 3.54635 15.0408 3.51339 12.417 3.44747C10.7999 3.40683 9.19877 3.40683 7.5817 3.44746C4.95796 3.51338 3.64608 3.54633 2.70347 4.49253C1.76087 5.43873 1.73363 6.71603 1.67915 9.27066C1.66163 10.0921 1.66164 10.9086 1.67916 11.73Z" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-base font-medium  ">Send Email All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
