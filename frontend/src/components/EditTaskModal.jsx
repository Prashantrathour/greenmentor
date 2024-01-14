import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/task/action";
import { errorAlert, succesAlert, warningAlert } from "../Notification";
import { ImSpinner } from "react-icons/im";
import {ToastContainer} from "react-toastify"
const EditTaskModal = ({ isOpen, onClose, initialData }) => {
  const dispatch = useDispatch();
  const { msg, isLoading, isError } = useSelector((store) => store.taskReducer);

  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !description) {
      warningAlert("Please fill Title and Description");
    } else {
      dispatch(updateTask(initialData._id, { title, description })).then(()=>{
        onClose()
      })
       
    }
  };
 
  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4`}
    >
      <div className="bg-white p-8  rounded-md  sm:px-10 px-4 w-full sm:w-1/2 lg:w-1/2 xl-1/3  transition-all">
        <h1 className="text-3xl font-bold mb-6">Edit Task</h1>
<ToastContainer/>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-600 text-left"
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
              className="block text-sm font-semibold text-gray-600 text-left"
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

          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white h-10 text-center py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {!isLoading ? (
                <span>Update Task</span>
              ) : (
                <span className="text-center flex justify-center py-1">
                  <ImSpinner className="animate-spin font-extrabold text-xl" />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
