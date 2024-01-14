import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../redux/task/action";
import { errorAlert, succesAlert, warningAlert } from "../Notification";
import { ImSpinner } from "react-icons/im";
import { FaCross } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
const CreateTask = ({createTaskModelOpen,setcreateTaskModelOpen}) => {
  const dispatch = useDispatch();
  const { msg, isLoading, isError } = useSelector((store) => store.taskReducer);
  console.log(msg, isLoading, isError);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !description) {
      warningAlert("Please fill Title and Description");
    } else {
      dispatch(createTask({ title, description })).then((result) => {
        setcreateTaskModelOpen(!createTaskModelOpen)
      })
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 p-3  transition-all">
      <div className="bg-white  rounded-md p-5 sm:px-10 px-2 w-full sm:w-1/2 lg:w-1/2 xl-1/3  transition-all">
        <div className="flex justify-between p-4 items-center">
            <h1 className="text-xl font-bold">Create Task</h1><IoIosCloseCircle onClick={()=>setcreateTaskModelOpen(!createTaskModelOpen)} className="text-2xl cursor-pointer" />

            </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="mt-1 p-2 w-full border rounded-md"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white w-full h-10 text-center py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {!isLoading ? (
              <span>Create Task</span>
            ) : (
              <span className="text-center flex justify-center py-1">
                <ImSpinner className="animate-spin font-extrabold text-xl" />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
