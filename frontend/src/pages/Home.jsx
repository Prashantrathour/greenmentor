import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { errorAlert, succesAlert } from "../Notification";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";
import { ImPlus } from "react-icons/im";
import {useSelector} from "react-redux"
function Home() {
  const { msg, isLoading, isError } = useSelector((store) => store.taskReducer);
  const [createTaskModelOpen,setcreateTaskModelOpen]=useState(false)
  const navigate = useNavigate();

  function onLogout() {
    localStorage.removeItem("token");
    succesAlert("User logged out");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  useEffect(() => {

    if (!localStorage.getItem("token")) {
      navigate("/login");
      return
    }
    console.log(msg,isLoading,isError)
    if (msg) {
      if (!isLoading && !isError) {
        
        succesAlert(msg);
      
      } else if (isError) {
        
        errorAlert(msg);
      }
    }
  }, [msg, isLoading, isError,navigate]);
  return (
    <div className=" w-full h-full">
     
  <div className="flex justify-end p-3">
    <button onClick={()=>setcreateTaskModelOpen(!createTaskModelOpen)} className="flex gap-1 justify-center items-center text-center p-2 px-3 border rounded-2xl bg-lime-500">CreateTask <ImPlus/></button>
  </div>
      <div className="flex h-full w-full">
       
       {createTaskModelOpen? <div >
          <CreateTask createTaskModelOpen={createTaskModelOpen} setcreateTaskModelOpen={setcreateTaskModelOpen} />
        </div>:""}

      
        <div className="flex-grow overflow-y-auto p-4">
          <TaskList />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
