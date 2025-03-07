'use client'
import React from 'react'

export default function EditModal({ isOpen, onClose, data, onUpdate }) {
  const [formData, setFormData] = React.useState({
    name: '',
    age: '',
    email: '',
    joinDate: '',
    time: '',
    status: ''
  });

  // Initialize form data when modal opens
  React.useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        age: data.age || '',
        email: data.email || '',
        joinDate: data.joinDate || '',
        time: data.time || '',
        status: data.status || ''
      });
    }
  }, [data]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...formData, id: data.id }); // Keep the original ID
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 backdrop-blur-xs bg-[#000]/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="w-[705px] p-6 bg-white rounded-xl flex-col justify-start items-start gap-5 inline-flex relative shadow-lg">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="self-stretch flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch text-[#070707] text-2xl font-medium   leading-normal">Edit Student Details</div>
            <div className="self-stretch flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal   leading-none">Name</div>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal  "
                  />
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal   leading-none">Age</div>
                  </div>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal  "
                  />
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <div className="text-[#4a4c56] text-base font-normal   leading-none">Email</div>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal  "
                  />
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="w-full self-stretch justify-start items-start gap-4 flex">
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="text-[#4a4c56] text-base font-normal   leading-none">Join Date</div>
                    </div>
                    <input
                      type="text"
                      name="joinDate"
                      value={formData.joinDate}
                      onChange={handleChange}
                      className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal  "
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="w-full self-stretch justify-start items-start gap-4 flex">
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="text-[#4a4c56] text-base font-normal   leading-none">Time</div>
                    </div>
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal  "
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="w-full self-stretch justify-start items-start gap-4 flex">
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="text-[#4a4c56] text-base font-normal   leading-none">Status</div>
                    </div>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full min-h-[56px] rounded-lg border border-[#E5E1E1] p-4 text-[#777980] text-sm font-normal  "
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-[#b60000] rounded-lg text-white text-base font-medium   hover:bg-[#a00000] transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-[#db0000]/30 rounded-lg text-[#b60000] text-base font-medium   hover:bg-[#ffefef] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
