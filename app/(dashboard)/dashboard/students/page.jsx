'use client'
import React from 'react'
import ViewModal from '../_components/viewmodal';
import MailModal from '../_components/mailmodal';
import EditModal from '../_components/editmodal';
import DeleteModal from '../_components/deletemodal';
import { StudentApis } from '@/app/api/studentApis';

export default function Students() {
  const [mounted, setMounted] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [isMailModalOpen, setIsMailModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [selectedStudents, setSelectedStudents] = React.useState([]);
  const [showActionMenu, setShowActionMenu] = React.useState(false);
  const [actionMenuPosition, setActionMenuPosition] = React.useState({ top: 0, left: 0 });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  // Initialize with empty data
  const [tableData, setTableData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [ageFilter, setAgeFilter] = React.useState('All');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [statistics, setStatistics] = React.useState({
    totalStudents: 0,
    activeStudents: 0,
    inactiveStudents: 0
  });

  // Set mounted state
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch students data
  React.useEffect(() => {
    if (!mounted) return;

    const fetchStudentsData = async () => {
      try {
        setLoading(true);
        const response = await StudentApis.getStudents();
        console.log('API Response:', response);
        
        if (response.success) {
          const { students, statistics } = response.data;
          console.log('Students Data:', students);
          console.log('Statistics:', statistics);
          
          setTableData(students || []);
          setFilteredData(students || []);
          setStatistics(statistics || {
            totalStudents: 0,
            activeStudents: 0,
            inactiveStudents: 0
          });
        } else {
          console.error('API Error:', response.message);
          setError(response.message || 'Failed to fetch students data');
        }
      } catch (err) {
        console.error('Students data fetch error:', err);
        setError('Error fetching students data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, [mounted]);

  // Update filtered data when filters or tableData changes
  React.useEffect(() => {
    if (!mounted) return;
    
    let filtered = [...tableData];
    
    // Filter by age (compare as numbers)
    if (ageFilter !== 'All') {
      filtered = filtered.filter(item => 
        String(item.age) === String(ageFilter)
      );
    }
    
    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(item => 
        item.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    setFilteredData(filtered);
  }, [ageFilter, statusFilter, tableData, mounted]);

  // Generate age options from tableData
  const generateAgeOptions = React.useCallback(() => {
    const ages = tableData.map(item => parseInt(item.age) || 0).filter(age => age > 0);
    if (ages.length === 0) return ['All'];
    
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);
    
    const ageOptions = ['All'];
    for (let age = minAge; age <= maxAge; age++) {
      ageOptions.push(`${age}`);
    }
    return ageOptions;
  }, [tableData]);

  const ageOptions = React.useMemo(() => generateAgeOptions(), [generateAgeOptions]);
  const statusOptions = ['All', 'Active', 'Inactive'];

  const renderStatus = (status) => {
    const isActive = status.toLowerCase() === "active";
    return (
      <div className={`h-[26px] pl-1.5 pr-2 py-1.5 ${isActive ? 'bg-green-100' : 'bg-[#fe5050]/10'} rounded-2xl border ${isActive ? 'border-green-300' : 'border-[#fe5050]'} justify-center items-center gap-1 flex`}>
        <div className={`text-center ${isActive ? 'text-green-700' : 'text-[#fe5050]'} text-sm font-normal   leading-[14px]`}>
          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </div>
      </div>
    );
  };

  const handleActionClick = (e, student) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Action clicked, student:', student);
    setSelectedStudent(student);
    const rect = e.currentTarget.getBoundingClientRect();
    setActionMenuPosition({
      top: rect.bottom + 5,
      left: rect.left - 110
    });
    setShowActionMenu(true);
  };

  const handleViewClick = async () => {
    try {
      console.log('Fetching student details:', selectedStudent.id);
      const response = await StudentApis.getStudentById(selectedStudent.id);
      
      if (response.success) {
        setSelectedStudent(response.data);
        setIsViewModalOpen(true);
      } else {
        console.error('Failed to fetch student details:', response.message);
      }
    } catch (err) {
      console.error('Error fetching student details:', err);
    }
    setShowActionMenu(false);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setShowActionMenu(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setShowActionMenu(false);
  };

  const handleSendEmailAll = () => {
    setSelectedStudents(filteredData);
    setIsMailModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedStudent(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
  };

  const handleCloseMailModal = () => {
    setIsMailModalOpen(false);
    setSelectedStudent(null);
    setSelectedStudents([]);
  };

  // Close action menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showActionMenu && !event.target.closest('.action-menu')) {
        setShowActionMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showActionMenu]);

  // Add this effect to track state changes
  React.useEffect(() => {
    console.log('State changed:', {
      isViewModalOpen,
      selectedStudent,
      showActionMenu
    });
  }, [isViewModalOpen, selectedStudent, showActionMenu]);

  const handleUpdateStudent = async (updatedData) => {
    try {
      console.log('Updating student:', selectedStudent.id, updatedData);
      
      // Format the data to match the API expectations
      const formattedData = {
        name: updatedData.name || selectedStudent.name,
        age: updatedData.age || selectedStudent.age,
        email: updatedData.email || selectedStudent.email,
        status: updatedData.status || selectedStudent.status
      };

      const response = await StudentApis.updateStudent(selectedStudent.id, formattedData);
      console.log('Update response:', response);

      if (response.success) {
        // Refresh the students list
        const studentsResponse = await StudentApis.getStudents();
        if (studentsResponse.success) {
          const { students, statistics } = studentsResponse.data;
          setTableData(students || []);
          setFilteredData(students || []);
          setStatistics(statistics || {
            totalStudents: 0,
            activeStudents: 0,
            inactiveStudents: 0
          });
        }
        setIsEditModalOpen(false);
        setSelectedStudent(null);
      } else {
        console.error('Failed to update student:', response.message);
      }
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      const response = await StudentApis.deleteStudent(selectedStudent.id);
      if (response.success) {
        // Refresh the students list
        const studentsResponse = await StudentApis.getStudents();
        if (studentsResponse.success) {
          const { students, statistics } = studentsResponse.data;
          setTableData(students || []);
          setFilteredData(students || []);
          setStatistics(statistics || {
            totalStudents: 0,
            activeStudents: 0,
            inactiveStudents: 0
          });
        }
        setIsDeleteModalOpen(false);
        setSelectedStudent(null);
      } else {
        console.error('Failed to delete student:', response.message);
      }
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div className="text-[#070707] text-2xl font-semibold   leading-normal">All Student List</div>
        <div className="h-12 px-[18px] py-3 bg-[#b60000] rounded-lg justify-center items-center gap-1.5 inline-flex cursor-pointer" onClick={handleSendEmailAll}>
          <div className="relative">
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.4873 5.5L8.24815 8.76414C10.372 9.9675 11.2693 9.9675 13.3931 8.76414L19.154 5.5" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
              <path d="M2.49947 11.73C2.55394 14.2847 2.58119 15.5619 3.52379 16.5082C4.46639 17.4543 5.77827 17.4872 8.40202 17.5532C10.0191 17.5938 11.6202 17.5938 13.2373 17.5532C15.8611 17.4872 17.1729 17.4543 18.1156 16.5082C19.0582 15.5619 19.0854 14.2847 19.1398 11.73C19.1574 10.9086 19.1574 10.0921 19.1398 9.27066C19.0854 6.71604 19.0582 5.43873 18.1156 4.49254C17.1729 3.54635 15.8611 3.51339 13.2373 3.44747C11.6202 3.40683 10.0191 3.40683 8.40201 3.44746C5.77827 3.51338 4.46639 3.54633 3.52379 4.49253C2.58118 5.43873 2.55394 6.71603 2.49946 9.27066C2.48194 10.0921 2.48195 10.9086 2.49947 11.73Z" stroke="white" strokeWidth="1.25" strokeLinejoin="round"/>
  </svg>
  </div>
  <div className="text-white text-base font-medium   leading-none">Send Email All</div>
</div>
      </div>

      <div className="w-full h-auto px-6 py-6 bg-white rounded-xl flex-col justify-start items-start gap-4 inline-flex">
        <div className="w-full relative">
          <div className="w-full flex-col justify-start items-center gap-4 inline-flex">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-[#070707] text-2xl font-semibold   leading-normal">All Student List</div>
        <div className="h-10 justify-end items-center gap-3 flex">
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
                      <path d="M5.82031 7.92778L10.8203 12.9277L15.8203 7.92773" stroke="#777980" strokeWidth="1.25" strokeMiterlimit="16" strokeLinecap="round" strokeLinejoin="round"/>
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
                      <path d="M5.82031 7.92778L10.8203 12.9277L15.8203 7.92773" stroke="#777980" strokeWidth="1.25" strokeMiterlimit="16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              </div>
                </div>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#eceff3]">
                    <th className="p-4 text-left text-[#070707] text-base font-normal">List</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Name</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Age</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Email</th>
                    <th className="p-4 text-left text-[#070707] text-base font-normal">Phone</th>
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
                      <td className="p-4 text-[#1d1f2c] text-base font-normal">{item.name}</td>
                      <td className="p-4 text-[#777980] text-base font-normal">{item.age ? `${item.age} Years` : ''}</td>
                      <td className="p-4 text-[#777980] text-base font-normal">{item.email}</td>
                      <td className="p-4 text-[#777980] text-base font-normal">{item.phone_number}</td>
                      <td className="p-4 text-[#777980] text-base font-normal">{item.joinDate}</td>
                      <td className="p-4 text-[#777980] text-base font-normal">{item.time}</td>
                      <td className="p-4">{renderStatus(item.status)}</td>
                      <td className="p-4">
                        <div className="flex justify-center items-center">
                          <button 
                            onClick={(e) => handleActionClick(e, item)} 
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                          >
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.3164 10.4277H10.3254" stroke="#777980" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14.3203 10.4277H14.3293" stroke="#777980" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6.32031 10.4277H6.32931" stroke="#777980" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
      </div>

      {showActionMenu && selectedStudent && (
        <div 
          className="action-menu p-2 bg-[#ffefef] rounded fixed flex-col justify-start items-start gap-2 flex shadow-lg z-[1000] min-w-[120px]"
          style={{ 
            top: actionMenuPosition.top, 
            left: actionMenuPosition.left 
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={handleViewClick} 
            className="w-full justify-start items-center gap-2.5 inline-flex hover:bg-[#ffe5e5] p-2 rounded transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.8875 6.87061C13.0648 7.11929 13.1535 7.24365 13.1535 7.42769C13.1535 7.61174 13.0648 7.7361 12.8875 7.98478C12.0906 9.10221 10.0555 11.511 7.32015 11.511C4.58477 11.511 2.54971 9.10221 1.75284 7.98478C1.57549 7.7361 1.48682 7.61174 1.48682 7.42769C1.48682 7.24365 1.57549 7.11929 1.75284 6.87061C2.54971 5.7532 4.58477 3.34436 7.32015 3.34436C10.0555 3.34436 12.0906 5.7532 12.8875 6.87061Z" stroke="#B60000"/>
              <path d="M9.07031 7.42773C9.07031 6.46121 8.28684 5.67773 7.32031 5.67773C6.35379 5.67773 5.57031 6.46121 5.57031 7.42773C5.57031 8.39426 6.35379 9.17773 7.32031 9.17773C8.28684 9.17773 9.07031 8.39426 9.07031 7.42773Z" stroke="#B60000"/>
            </svg>
            <span className="text-[#777980] text-sm font-normal">View</span>
          </button>
          <button 
            onClick={handleEditClick}
            className="w-full justify-start items-center gap-2.5 inline-flex hover:bg-[#ffe5e5] p-2 rounded transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.19537 3.9175L10.013 3.09981C10.4646 2.64821 11.1968 2.64821 11.6485 3.09981C12.1 3.55141 12.1 4.2836 11.6485 4.73519L10.8307 5.55289M9.19537 3.9175L4.39228 8.72061C3.78252 9.33037 3.47763 9.63522 3.27002 10.0067C3.06242 10.3783 2.85354 11.2555 2.65381 12.0944C3.49269 11.8947 4.36997 11.6858 4.74149 11.4782C5.11302 11.2706 5.4179 10.9657 6.02766 10.356L10.8307 5.55289M9.19537 3.9175L10.8307 5.55289" stroke="#B60000" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.73682 12.0944H10.2368" stroke="#B60000" strokeLinecap="round"/>
            </svg>
            <span className="text-[#777980] text-sm font-normal">Edit</span>
          </button>
          <button 
            onClick={handleDeleteClick}
            className="w-full justify-start items-center gap-2.5 inline-flex hover:bg-[#ffe5e5] p-2 rounded transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6953 3.63611L11.3338 9.48408C11.2414 10.9782 11.1953 11.7253 10.8208 12.2624C10.6356 12.5279 10.3972 12.752 10.1207 12.9204C9.56154 13.2611 8.81306 13.2611 7.31605 13.2611C5.81713 13.2611 5.06765 13.2611 4.50809 12.9198C4.23145 12.7511 3.99298 12.5266 3.80788 12.2606C3.43349 11.7226 3.38832 10.9745 3.298 9.47831L2.94531 3.63611" stroke="#B60000" strokeLinecap="round"/>
              <path d="M2.07031 3.63603H12.5703M9.68614 3.63603L9.28795 2.81454C9.02341 2.26885 8.89111 1.996 8.66297 1.82583C8.6124 1.78809 8.55879 1.75451 8.50273 1.72544C8.25009 1.59436 7.94687 1.59436 7.34044 1.59436C6.71878 1.59436 6.40798 1.59436 6.15113 1.73093C6.0942 1.7612 6.03988 1.79614 5.98873 1.83538C5.75794 2.01244 5.62901 2.29526 5.37117 2.86093L5.01785 3.63603" stroke="#B60000" strokeLinecap="round"/>
              <path d="M5.86182 10.0527V6.55273" stroke="#B60000" strokeLinecap="round"/>
              <path d="M8.77881 10.0527V6.55273" stroke="#B60000" strokeLinecap="round"/>
            </svg>
            <span className="text-[#777980] text-sm font-normal">Delete</span>
          </button>
        </div>
      )}

      <ViewModal 
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        data={selectedStudent}
      />
      <EditModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        data={selectedStudent}
        onUpdate={handleUpdateStudent}
      />
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        data={selectedStudent}
        onDelete={handleDeleteStudent}
      />
      <MailModal 
        isOpen={isMailModalOpen}
        onClose={handleCloseMailModal}
        selectedStudents={selectedStudents}
      />
    </div>
  )
}
