import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { deleteTask } from "../redux/task/action";
import EditTaskModal from "./EditTaskModal"; // Import your EditTaskModal component
import { ToastContainer } from "react-toastify";
import "../App.css";
const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div
      className={`border rounded-md p-4 mb-4 flex items-center justify-between bg-white shadow-md transition-all `}
    >
      <ToastContainer />

      <div className="flex-grow pr-4">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <div
          className={`description-container overflow-hidden ${
            showFullDescription ? "animate-expand" : "animate-collapse"
          } transition-max-height`}
        >
          <p className={`text-gray-600 overflow-ellipsis text-sm`}>
            {task.description}
          </p>
        </div>
        <div>
          {!showFullDescription && (
            <button
              onClick={toggleDescription}
              className="toggle-button underline text-blue-600"
            >
              See More
            </button>
          )}
          {showFullDescription && (
            <button
              onClick={toggleDescription}
              className="toggle-button underline text-blue-600"
            >
              Hide
            </button>
          )}
          <div className="text-xs font-medium text-gray-500">
            <p>
             UpdateAt: {new Date(task.updatedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
               
                timeZone: "Asia/Kolkata", // Set to Indian Standard Time
              })}
            </p>
            <p>
              CreateAt: {new Date(task.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              
                timeZone: "Asia/Kolkata", // Set to Indian Standard Time
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaPencilAlt />
        </button>

        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>

      {/* EditTaskModal */}
      {isEditModalOpen && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          initialData={task}
        />
      )}
    </div>
  );
};

export default TaskItem;
