import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { succesAlert } from "../Notification";
import { isAuth, login } from "../redux/user/action";
import {useDispatch,useSelector} from "react-redux"
function NavBar() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {isLogin} =useSelector((state)=>state.userReducer)

  function onLogout() {
    localStorage.removeItem("token");
    succesAlert("User logged out");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
   dispatch(isAuth(false))
  }
useEffect(()=>{
  if(localStorage.getItem("token")){
    dispatch(isAuth(true))
  }
},[])
console.log(isLogin)
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-white text-lg font-semibold">
          MyTasks
        </Link>

        {isLogin?<div className="flex items-center">
          <Link to={"/profile"} className="text-white mx-4">
            Profile
          </Link>

          <button
            onClick={onLogout}
            className="bg-red-500 text-white font-semibold text-sm py-2 px-4 rounded-full"
          >
            Logout
          </button>
        </div>:<div className="flex items-center">
          <Link to={"/profile"} className="text-white mx-4">
            Login
          </Link>

        
        </div>}
        
      </div>
    </nav>
  );
}

export default NavBar;
