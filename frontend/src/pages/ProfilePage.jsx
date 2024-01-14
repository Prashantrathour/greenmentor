import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../redux/userProfile/profileActions";
import EditProfile from "../components/EditProfile";
import { ImSpinner9 } from "react-icons/im";
const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

 
  const [modalInitialData, setModalInitialData] = useState({});
  const { userProfile, isLoading, error } = useSelector(
    (state) => state.profileReducer
  );
  const tasks = userProfile[0]?.tasks;
  console.log(userProfile, isLoading, error);
  const openEditModal = (data) => {
    setModalInitialData(data);
    setIsEditModalOpen(true);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
    dispatch(getUserProfile);
  }, []);
  return (
    <div className=" antialiased w-full h-full relative ">
      <div className="container mx-auto ">
        <div>
         { !isLoading?<div className="bg-white  shadow-2xl  rounded-lg w-4/6 md:w-5/8   mx-auto mt-2">
            <div className="flex justify-center">
              <img
                src={userProfile[0]?.profileUrl||"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"}
                alt=""
                className="rounded-full mx-auto  w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
              />
            </div>

            <div className="mt-1">
              <h1 className="font-bold text-center text-3xl text-gray-900">
                {userProfile[0]?.name}
              </h1>
              <p className="text-center text-sm text-gray-400 font-medium">
                {userProfile[0]?.email}
              </p>

              <div class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                Address:{userProfile[0]?.address || "Add Address"}
              </div>
              <div class="flex justify-between items-center my-5 px-6">
                <div class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                  Gender:{userProfile[0]?.gender || "Add Gender"}
                </div>
                <div class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                  {userProfile[0]?.phoneNumber || "Add Phone Number"}
                </div>
              </div>

              <div className="my-5 px-6">
                <button onClick={() => openEditModal(userProfile[0])} className="text-gray-200 block w-full rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">
                  Edit Your Profile
                </button>
              </div>
    {isEditModalOpen?<EditProfile
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  initialData={modalInitialData}
/>:""}
              <div className="w-full ">
                <Link to={"/"} className="font-medium text-gray-900 text-left px-6">
                  All Tasks
                </Link>
                <div className="mt-5 w-full flex flex-col items-center overflow-auto h-full text-sm max-h-44 border">
                  {tasks &&
                    tasks.map((task) => (
                      <div className="w-full flex border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3  hover:bg-gray-100 transition duration-150">
                        <img
                          src={userProfile[0]?.profileUrl||"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"}
                          alt=""
                          className="rounded-full h-6 shadow-md inline-block mr-2"
                        />
                        <p>{task.title}</p>
                        <span className="text-gray-500 text-xs">
                          24 min ago
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>: <div className="w-full flex justify-center text-3xl items-center h-32 text-center "><span><ImSpinner9 className=" animate-spin text-center text-xl block" /></span></div>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
