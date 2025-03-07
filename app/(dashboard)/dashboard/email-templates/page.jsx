'use client'
import React from 'react'
import AddTemplate from '../_components/addtemplate';
import EditModal from '../_components/editmodal';
import DeleteModal from '../_components/deletemodal';

export default function Templates() {
  const [isAddTemplateOpen, setIsAddTemplateOpen] = React.useState(false);
  const [templates, setTemplates] = React.useState([
    { id: 1, templateName: "Welcome Email", subject: "Welcome to our school", date: "16/02/2025" },
    { id: 2, templateName: "Attendance Notice", subject: "Your attendance report", date: "16/02/2025" },
    { id: 3, templateName: "Exam Reminder", subject: "Upcoming Exam Notice", date: "12/02/2025" },
    { id: 4, templateName: "Welcome Email", subject: "Your Welcome Email", date: "16/02/2025" },
    { id: 5, templateName: "Exam Reminder", subject: "Upcoming Exam Notice", date: "15/02/2025" },
    { id: 6, templateName: "Attendance Notice", subject: "Your attendance report", date: "14/02/2025" },
  ]);

  const handleAddTemplate = () => {
    setIsAddTemplateOpen(true);
  };

  const handleCloseAddTemplate = () => {
    setIsAddTemplateOpen(false);
  };

  const handleTemplateSubmit = (data) => {
    // Add new template to the table
    setTemplates(prevTemplates => [data, ...prevTemplates]);
    // Log the new template data
    console.log('New template added:', data);
    console.log('Updated templates:', [...templates, data]);
  };

  return (
    <>
      <div className="w-full h-[608px] flex-col justify-start items-start gap-6 inline-flex mt-6">
        <div className="w-full h-auto pl-6 pr-6 py-6 bg-white rounded-xl flex-col justify-start items-start gap-4 flex">
          {/* Header */}
          <div className="w-full flex justify-between items-center mb-6">
            <div className="text-[#070707] text-2xl font-semibold  ">Email Templates</div>
            <div 
              onClick={handleAddTemplate}
              className="px-[18px] py-3 bg-[#b60000] rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[#a00000] transition-colors"
            >
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.3201 7.09442V13.7611M13.6535 10.4278H6.98682" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.6535 10.4278C18.6535 5.82538 14.9225 2.09442 10.3201 2.09442C5.71777 2.09442 1.98682 5.82538 1.98682 10.4278C1.98682 15.0301 5.71777 18.7611 10.3201 18.7611C14.9225 18.7611 18.6535 15.0301 18.6535 10.4278Z" stroke="white" strokeWidth="1.25"/>
              </svg>
              <span className="text-white text-base font-medium  ">Add Email Template</span>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-[#eceff3]">
                  <th className="p-4 text-left text-[#070707] text-base font-normal  ">List</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal  ">Template Name</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal  ">Subject</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal  ">Date</th>
                  <th className="p-4 text-left text-[#070707] text-base font-normal  ">Action</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((item, index) => (
                  <tr key={item.id} className="border-b border-[#eaecf0]">
                    <td className="p-4 text-[#1d1f2c] text-sm font-normal  ">{index + 1}</td>
                    <td className="p-4 text-[#1d1f2c] text-base font-normal  ">{item.templateName}</td>
                    <td className="p-4 text-[#777980] text-base font-normal  ">{item.subject}</td>
                    <td className="p-4 text-[#777980] text-base font-normal  ">{item.date}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button className="cursor-pointer hover:opacity-80 transition-opacity">
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.2704 3.49779L11.9304 2.8378C12.4772 2.29105 13.3637 2.29105 13.9104 2.8378C14.4571 3.38456 14.4571 4.27102 13.9104 4.81778L13.2504 5.47777M11.2704 3.49779L6.83086 7.93733C6.49252 8.27573 6.2525 8.6996 6.13646 9.1638L5.65381 11.0944L7.58441 10.6117C8.04861 10.4957 8.47248 10.2557 8.81088 9.91733L13.2504 5.47777M11.2704 3.49779L13.2504 5.47777" stroke="#777980" strokeLinejoin="round"/>
                            <path d="M12.9869 9.42778C12.9869 11.6194 12.9869 12.7152 12.3816 13.4528C12.2708 13.5878 12.147 13.7116 12.012 13.8224C11.2744 14.4278 10.1786 14.4278 7.98691 14.4278H7.65365C5.13949 14.4278 3.88242 14.4278 3.10137 13.6467C2.32033 12.8657 2.32031 11.6086 2.32031 9.09444V8.76111C2.32031 6.56946 2.32031 5.47364 2.92561 4.73607C3.03643 4.60104 3.16025 4.47722 3.29527 4.3664C4.03284 3.76111 5.12866 3.76111 7.32031 3.76111" stroke="#777980" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <div className="w-[1px] h-5 bg-[#dfe1e6]"></div>
                        <button className="cursor-pointer hover:opacity-80 transition-opacity">
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3203 4.09436L12.9072 10.7778C12.8016 12.4853 12.7488 13.3391 12.3208 13.953C12.1092 14.2564 11.8368 14.5126 11.5208 14.705C10.8817 15.0944 10.0263 15.0944 8.31545 15.0944C6.60239 15.0944 5.74585 15.0944 5.10635 14.7043C4.79018 14.5115 4.51765 14.2549 4.3061 13.9509C3.87823 13.3361 3.82661 12.4811 3.72339 10.7712L3.32031 4.09436" stroke="#777980" strokeLinecap="round"/>
                            <path d="M2.32031 4.09444H14.3203M11.0241 4.09444L10.569 3.1556C10.2667 2.53195 10.1155 2.22012 9.85478 2.02565C9.79698 1.98251 9.73571 1.94414 9.67165 1.91091C9.38291 1.76111 9.03638 1.76111 8.34331 1.76111C7.63285 1.76111 7.27765 1.76111 6.9841 1.91719C6.91905 1.95178 6.85697 1.99171 6.79851 2.03656C6.53474 2.23891 6.3874 2.56214 6.09272 3.20861L5.68893 4.09444" stroke="#777980" strokeLinecap="round"/>
                            <path d="M6.65381 11.4277V7.42773M9.98682 11.4277V7.42773" stroke="#777980" strokeLinecap="round"/>
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

      <AddTemplate 
        isOpen={isAddTemplateOpen}
        onClose={handleCloseAddTemplate}
        onSubmit={handleTemplateSubmit}
      />
    </>
  )
}
