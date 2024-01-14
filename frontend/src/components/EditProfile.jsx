import axios from "axios"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUserProfile } from '../redux/userProfile/profileActions';
import {succesAlert,errorAlert} from "../Notification"
import {ToastContainer} from "react-toastify"
const EditProfile = ({ isOpen, onClose, initialData }) => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.profileReducer);
const [loading,setloading]=useState(false)
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
    gender: initialData?.gender || 'Male', // Default to 'Male' if not provided
    phoneNumber: initialData?.phoneNumber || '',
    profileUrl: initialData?.profileUrl || '',
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || '',
      email: initialData?.email || '',
      address: initialData?.address || '',
      gender: initialData?.gender || 'Male',
      phoneNumber: initialData?.phoneNumber || '',
      profileUrl: initialData?.profileUrl || '',
    });
  }, [initialData]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    dispatch(editUserProfile(formData));
    onClose();
  };
  const saveimage=async(image)=>{
    const images=new FormData()
    images.append("file",image)
    images.append("upload_preset","prashant_cloud")
    images.append("cloud_name","djpuwf2xv")
    try {
        setloading(true)
        const res=await axios.post(`https://api.cloudinary.com/v1_1/djpuwf2xv/image/upload`,images)
    console.log(res)
        succesAlert("image uploaded successfully")
        setloading(false)
        setFormData({...formData,profileUrl:res?.data?.url})
    } catch (error) {
     errorAlert("Error uploading image")
       
        setloading(false)
    }
}
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        saveimage(file)
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white w-96 p-8 rounded-lg shadow-lg z-10">
            <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
            <ToastContainer/>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="profileImage" className="block text-sm font-semibold text-gray-900">
                  Profile Image
                </label>
                <input
                  type="file"
                  disabled={loading}
                  id="profileImage"
                
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className=" p-1 w-full  rounded-md"
                />
               
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-semibold text-gray-600">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-600">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 text-gray-500 hover:text-gray-700"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading}
                  className="bg-blue-500 text-white h-10 text-center py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={handleSaveChanges}
                >
                  {!loading ? "Save Changes":"Image uploding..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
