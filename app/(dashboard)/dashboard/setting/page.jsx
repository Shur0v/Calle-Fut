"use client"
import React, { useState, useRef, useEffect } from 'react'

export default function Setting() {
  // Initialize with null or empty values for server-side rendering
  const [profileImage, setProfileImage] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const fileInputRef = useRef(null)
  
  // Initialize form values with null
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  // Set initial values after component mounts on client side
  useEffect(() => {
    setIsClient(true)
    setProfileImage('https://placehold.co/79x79')
    setFormValues({
      name: 'Coach Marco',
      email: 'marco@uta.com',
      password: 'xxxxxxxx'
    })
  }, [])

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleReplacePhoto = () => {
    fileInputRef.current?.click()
  }

  const handleRemovePhoto = () => {
    setProfileImage('https://placehold.co/79x79')
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormValues({
      name: 'Coach Marco',
      email: 'marco@uta.com',
      password: 'xxxxxxxx'
    })
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Profile Section */}
      <div className="w-full p-6 bg-white rounded-xl flex items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="w-[79.46px] h-[79.46px] relative">
            {profileImage && (
              <img 
                className="w-full h-full rounded-full border border-[#ff9292] object-cover" 
                src={profileImage} 
                alt="Profile"
              />
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="absolute bottom-0 right-0">
              <div className="w-6 h-6 relative">
                <div className="w-6 h-6 bg-[#db0000] rounded-full" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.22322 7.1594C9.22322 6.23039 8.46988 5.47705 7.54087 5.47705C6.61186 5.47705 5.85852 6.23039 5.85852 7.1594C5.85852 8.08841 6.61186 8.84175 7.54087 8.84175C8.46988 8.84175 9.22322 8.08841 9.22322 7.1594Z" stroke="white" strokeWidth="0.781395" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.54135 11.2797C11.8446 11.2797 12.357 9.99034 12.357 7.19656C12.357 5.23832 12.098 4.19051 10.4669 3.74008C10.3171 3.69279 10.151 3.6027 10.0165 3.45462C9.79912 3.21646 9.64035 2.48508 9.1156 2.26381C8.59085 2.0431 6.48341 2.05323 5.9671 2.26381C5.45136 2.47494 5.28358 3.21646 5.06625 3.45462C4.93168 3.6027 4.76615 3.69279 4.61582 3.74008C2.9847 4.19051 2.72571 5.23832 2.72571 7.19656C2.72571 9.99034 3.23807 11.2797 7.54135 11.2797Z" stroke="white" strokeWidth="0.781395" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.1704 5.29137H10.1752" stroke="white" strokeWidth="0.837209" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="text-[#22262e] text-2xl font-semibold  ">{formValues.name}</div>
            <div className="flex gap-4">
              <button 
                onClick={handleReplacePhoto}
                className="px-4 py-3 bg-[#b60000] rounded-lg flex items-center gap-1.5 hover:bg-[#a00000] transition-colors"
              >
                <span className="text-white text-base font-medium  ">Replace Photo</span>
              </button>
              <button 
                onClick={handleRemovePhoto}
                className="px-4 py-3 rounded-lg border border-[#db0000]/30 flex items-center gap-1.5 hover:bg-[#fff0f0] transition-colors"
              >
                <span className="text-[#b60000] text-base font-medium  ">Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-[#22262e] text-[32px] font-semibold  ">Settings</h1>
        </div>

        <div className="w-full p-6 bg-white rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[#22262e] text-2xl font-medium  ">Account Settings</h2>
            <button onClick={handleEdit} className="flex items-center gap-1.5 text-[#b60000] cursor-pointer hover:opacity-80">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.9249 5.06993L17.9149 4.07994C18.7351 3.25981 20.0648 3.25981 20.8849 4.07994C21.705 4.90008 21.705 6.22977 20.8849 7.04991L19.8949 8.0399M16.9249 5.06993L10.2656 11.7292C9.75807 12.2368 9.39804 12.8726 9.22397 13.5689L8.5 16.4648L11.3959 15.7408C12.0922 15.5668 12.728 15.2067 13.2356 14.6992L19.8949 8.0399M16.9249 5.06993L19.8949 8.0399" stroke="#B60000" strokeWidth="1.25" strokeLinejoin="round"/>
                <path d="M19.4999 13.9648C19.4999 17.2523 19.4999 18.896 18.592 20.0024C18.4258 20.2049 18.2401 20.3906 18.0375 20.5568C16.9312 21.4648 15.2874 21.4648 11.9999 21.4648H11.5C7.72876 21.4648 5.84316 21.4648 4.67159 20.2932C3.50003 19.1217 3.5 17.236 3.5 13.4648V12.9648C3.5 9.67736 3.5 8.03363 4.40794 6.92728C4.57417 6.72474 4.7599 6.53901 4.96244 6.37278C6.06879 5.46484 7.71252 5.46484 11 5.46484" stroke="#B60000" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg font-normal  ">Edit</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label className="text-[#4a4c56] text-base font-normal  ">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  className="p-5 rounded-lg border border-[#e5e1e1] text-[#777980] text-sm font-normal   focus:outline-none focus:border-[#b60000] transition-colors"
                />
              ) : (
                <div className="p-5 rounded-lg border border-[#e5e1e1]">
                  <span className="text-[#777980] text-sm font-normal  ">{formValues.name}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#4a4c56] text-base font-normal  ">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className="p-5 rounded-lg border border-[#e5e1e1] text-[#777980] text-sm font-normal   focus:outline-none focus:border-[#b60000] transition-colors"
                />
              ) : (
                <div className="p-5 rounded-lg border border-[#e5e1e1]">
                  <span className="text-[#777980] text-sm font-normal  ">{formValues.email}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#4a4c56] text-base font-normal  ">Password</label>
              {isEditing ? (
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  className="p-5 rounded-lg border border-[#e5e1e1] text-[#777980] text-sm font-normal   focus:outline-none focus:border-[#b60000] transition-colors"
                />
              ) : (
                <div className="p-5 rounded-lg border border-[#e5e1e1]">
                  <span className="text-[#777980] text-sm font-normal  ">{formValues.password}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-4 mt-6">
            <button 
              onClick={handleSave}
              className="w-[100px] h-12 px-[18px] py-3 bg-[#b60000] rounded-lg text-white font-medium   hover:bg-[#a00000] transition-colors"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="w-[100px] h-12 px-[18px] py-3 rounded-lg border border-[#db0000]/30 text-[#b60000] font-medium   hover:bg-[#fff0f0] transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
