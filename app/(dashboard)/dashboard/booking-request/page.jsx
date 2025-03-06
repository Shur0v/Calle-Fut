'use client'
import React from 'react'
import MailModal from '../_components/mailmodal';

export default function BookingRequest() {
  const [ageFilter, setAgeFilter] = React.useState('All');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [isMailModalOpen, setIsMailModalOpen] = React.useState(false);
  const [selectedStudents, setSelectedStudents] = React.useState([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState(null);

  const tableData = [
    { id: 1, childName: "Jenny Wilson", parentName: "Cody Fisher", age: "16 Years", email: "abcd@gmail.com", sessionDay: "Wednesday", status: "Complete" },
    { id: 2, childName: "Kathryn Murphy", parentName: "Wade Warren", age: "13 Years", email: "abcd@gmail.com", sessionDay: "Monday", status: "Cancel" },
    { id: 3, childName: "Dianne Russell", parentName: "Courtney Henry", age: "16 Years", email: "abcd@gmail.com", sessionDay: "Tuesday", status: "Complete" },
    { id: 4, childName: "Bessie Cooper", parentName: "Robert Fox", age: "16 Years", email: "abcd@gmail.com", sessionDay: "Wednesday", status: "Complete" },
    { id: 5, childName: "Jane Cooper", parentName: "Ronald Richards", age: "11 Years", email: "abcd@gmail.com", sessionDay: "Monday", status: "Complete" },
    { id: 6, childName: "Arlene McCoy", parentName: "Jerome Bell", age: "16 Years", email: "abcd@gmail.com", sessionDay: "Wednesday", status: "Cancel" },
  ];

  const [filteredData, setFilteredData] = React.useState(tableData);

  // Dynamically generate age options from tableData
  const generateAgeOptions = () => {
    const ages = tableData.map(item => item.age);
    const uniqueAges = ['All', ...new Set(ages)];
    return uniqueAges;
  };

  const ageOptions = generateAgeOptions();
  const statusOptions = ['All', 'Complete', 'Cancel'];

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

  const handleStatusClick = (booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const handleCancelBooking = () => {
    if (selectedBooking) {
      const updatedData = filteredData.map(item => 
        item.id === selectedBooking.id 
          ? { ...item, status: item.status === "Complete" ? "Cancel" : "Complete" } 
          : item
      );
      setFilteredData(updatedData);
      setIsCancelModalOpen(false);
      setSelectedBooking(null);
    }
  };

  const renderStatus = (status, booking) => {
    const isComplete = status === "Complete";
    return (
      <div 
        onClick={() => handleStatusClick(booking)}
        className={`pl-1.5 pr-2 py-1.5 ${isComplete ? 'bg-[#38c976]/10 hover:bg-[#38c976]/20' : 'bg-[#fe5050]/10 hover:bg-[#fe5050]/20'} rounded-2xl border ${isComplete ? 'border-[#abefc6]' : 'border-[#fe5050]'} justify-center items-center gap-1 flex transition-colors cursor-pointer`}
      >
        <div className={`text-center ${isComplete ? 'text-[#067647]' : 'text-[#fe5050]'} text-sm font-normal font-['Montserrat'] leading-[14px]`}>
          {status}
        </div>
      </div>
    );
  };

  const handleSendEmailAll = () => {
    setSelectedStudents(filteredData);
    setIsMailModalOpen(true);
  };

  const handleCloseMailModal = () => {
    setIsMailModalOpen(false);
    setSelectedStudents([]);
  };

  return (
    <>
      <div className="w-full h-[608px] pl-6 py-6 bg-white rounded-xl flex-col justify-start items-start gap-4 inline-flex">
        <div className="w-full h-[496px] relative">
          <div className="w-full h-[496px] flex-col justify-start items-center gap-4 inline-flex">
            {/* Header with filters */}
            <div className="w-full flex justify-between items-center">
              <div className="text-[#070707] text-2xl font-semibold font-['Montserrat']">Booking List</div>
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
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.91016 7.92778L10.9102 12.9277L15.9102 7.92773" stroke="#777980" strokeWidth="1.25" strokeMiterlimit="16" strokeLinecap="round" strokeLinejoin="round"/>
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
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.91016 7.92778L10.9102 12.9277L15.9102 7.92773" stroke="#777980" strokeWidth="1.25" strokeMiterlimit="16" strokeLinecap="round" strokeLinejoin="round"/>
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
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">List</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Child Name</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Parent's Name</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Email</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Age</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Session Day</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Status</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal font-['Montserrat']">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-[#eaecf0]">
                      <td className="p-4 text-[#1d1f2c] text-sm font-normal font-['Montserrat']">{item.id}</td>
                      <td className="p-4 text-[#1d1f2c] text-base font-normal font-['Montserrat']">{item.childName}</td>
                      <td className="p-4 text-[#777980] text-base font-normal font-['Montserrat']">{item.parentName}</td>
                      <td className="p-4 text-[#777980] text-base font-normal font-['Montserrat']">{item.email}</td>
                      <td className="p-4 text-[#777980] text-base font-normal font-['Montserrat']">{item.age}</td>
                      <td className="p-4 text-[#777980] text-base font-normal font-['Montserrat']">{item.sessionDay}</td>
                      <td className="p-4">{renderStatus(item.status, item)}</td>
                      <td className="p-4">
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => {
                              setSelectedStudents([item]);
                              setIsMailModalOpen(true);
                            }}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.66699 5.5L7.42784 8.76414C9.55166 9.9675 10.449 9.9675 12.5728 8.76414L18.3337 5.5" stroke="#777980" strokeWidth="1.25" strokeLinejoin="round"/>
                              <path d="M1.67916 11.73C1.73363 14.2847 1.76087 15.5619 2.70348 16.5082C3.64608 17.4543 4.95796 17.4872 7.58171 17.5532C9.19877 17.5938 10.7999 17.5938 12.417 17.5532C15.0408 17.4872 16.3526 17.4543 17.2953 16.5082C18.2378 15.5619 18.2651 14.2847 18.3195 11.73C18.3371 10.9086 18.3371 10.0921 18.3195 9.27066C18.2651 6.71604 18.2378 5.43873 17.2953 4.49254C16.3526 3.54635 15.0408 3.51339 12.417 3.44747C10.7999 3.40683 9.19877 3.40683 7.5817 3.44746C4.95796 3.51338 3.64608 3.54633 2.70347 4.49253C1.76087 5.43873 1.73363 6.71603 1.67915 9.27066C1.66163 10.0921 1.66164 10.9086 1.67916 11.73Z" stroke="#777980" strokeWidth="1.25" strokeLinejoin="round"/>
                            </svg>
                          </button>
                </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Send Email All button */}
        <div className="self-stretch px-6 justify-end items-center gap-4 inline-flex">
          <button 
            onClick={handleSendEmailAll}
            className="px-[18px] py-3 bg-[#b60000] rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[#a00000] transition-colors"
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.57812 5.5L8.33897 8.76414C10.4628 9.9675 11.3601 9.9675 13.484 8.76414L19.2448 5.5" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
              <path d="M2.58931 11.73C2.64379 14.2847 2.67103 15.5619 3.61364 16.5082C4.55624 17.4543 5.86811 17.4872 8.49186 17.5532C10.1089 17.5938 11.7101 17.5938 13.3272 17.5532C15.9509 17.4872 17.2628 17.4543 18.2054 16.5082C19.148 15.5619 19.1753 14.2847 19.2297 11.73C19.2473 10.9086 19.2473 10.0921 19.2297 9.27066C19.1753 6.71604 19.148 5.43873 18.2054 4.49254C17.2628 3.54635 15.9509 3.51339 13.3272 3.44747C11.7101 3.40683 10.1089 3.40683 8.49185 3.44746C5.86811 3.51338 4.55624 3.54633 3.61363 4.49253C2.67102 5.43873 2.64379 6.71603 2.58931 9.27066C2.57179 10.0921 2.5718 10.9086 2.58931 11.73Z" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
            </svg>
            <span className="text-white text-base font-medium font-['Montserrat']">Send Email All</span>
          </button>
        </div>
      </div>

      <MailModal 
        isOpen={isMailModalOpen}
        onClose={handleCloseMailModal}
        selectedStudents={selectedStudents}
      />

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-[#000]/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold font-['Montserrat'] mb-4">Change Status</h3>
            <p className="text-[#777980] font-['Montserrat'] mb-6">
              Are you sure you want to change the status for {selectedBooking?.childName} from {selectedBooking?.status} to {selectedBooking?.status === "Complete" ? "Cancel" : "Complete"}?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="px-4 py-2 border border-[#dfe1e6] rounded-lg text-[#777980] font-medium font-['Montserrat'] hover:bg-gray-50 transition-colors"
              >
                No, Keep it
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 bg-[#b60000] text-white rounded-lg font-medium font-['Montserrat'] hover:bg-[#a00000] transition-colors"
              >
                Yes, Change it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
