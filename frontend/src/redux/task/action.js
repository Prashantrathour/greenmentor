import axios from 'axios';
import {
  TASK_REQUEST,
  POST_TASK_SUCCSESS,
  GET_TASK_SUCCSESS,
  UPDATE_TASK_SUCCSESS,
  DELETE_TASK_SUCCSESS,
  TASK_ERROR,
} from './actiontype';

const BASE_URL = process.env.REACT_APP_BASEURL;

// Action creator for task request
export const taskRequest = () => ({
  type: TASK_REQUEST,
});

// Action creator for successful task creation
export const postTaskSuccess = (task) => ({
  type: POST_TASK_SUCCSESS,
  payload: task,
});

// Action creator for successful task retrieval
export const getTaskSuccess = (tasks) => ({
  type: GET_TASK_SUCCSESS,
  payload: tasks,
});

// Action creator for successful task update
export const updateTaskSuccess = (task) => ({
  type: UPDATE_TASK_SUCCSESS,
  payload: task,
});

// Action creator for successful task deletion
export const deleteTaskSuccess = (res,taskId) => ({
  type: DELETE_TASK_SUCCSESS,
  payload: {taskId,res},
});

// Action creator for task-related errors
export const taskError = (error) => ({
  type: TASK_ERROR,
  payload: error,
});

// Function to create a new task
export const createTask = (taskData) => async (dispatch) => {
  dispatch(taskRequest());

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(BASE_URL + '/api/tasks', taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(postTaskSuccess(response.data));
    return response
  } catch (error) {
    dispatch(taskError(error?.response?.data));
    return error
  }
};

// Function to get all tasks
export const getAllTasks = async (dispatch) => {
  dispatch(taskRequest());

  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(BASE_URL + '/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    dispatch(getTaskSuccess(response.data));
  } catch (error) {
    dispatch(taskError(error?.response?.data));
  }
};

// Function to update a task
export const updateTask = (taskId, updatedTaskData) => async (dispatch) => {
  dispatch(taskRequest());

  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      BASE_URL + `/api/tasks/${taskId}`,
      updatedTaskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    dispatch(updateTaskSuccess(response.data));
    return response
  } catch (error) {
    console.log(error)
    dispatch(taskError(error?.response?.data));
    return error
  }
};

// Function to delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(taskRequest());

  try {
    const token = localStorage.getItem('token');
    const res=await axios.delete(BASE_URL + `/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(deleteTaskSuccess(res.data,taskId));
  } catch (error) {
    console.log(error)
    dispatch(taskError(error?.response?.data));
  }
};
