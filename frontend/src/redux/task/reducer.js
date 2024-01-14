import {
    TASK_REQUEST,
    POST_TASK_SUCCSESS,
    GET_TASK_SUCCSESS,
    UPDATE_TASK_SUCCSESS,
    DELETE_TASK_SUCCSESS,
  
    TASK_ERROR,
  } from './actiontype';
  
  const initialState = {
    tasks: [],
    isLoading: false,
    isError: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case TASK_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: null,
          msg:null
        };
  
      case POST_TASK_SUCCSESS:
        return {
          ...state,
          tasks: [...state.tasks, action.payload.task],
          isLoading: false,
          isError: null,
          msg:action?.payload?.msg
        };
  
      case GET_TASK_SUCCSESS:
        return {
          ...state,
          tasks: action.payload,
          isLoading: false,
          isError: null,
          msg:null
        };
  
      case UPDATE_TASK_SUCCSESS:
        const updatedTasks = state.tasks.map((task) =>
          task._id === action?.payload?.task?._id ? action.payload.task : task
        );
      
        return {
          ...state,
          tasks: updatedTasks,
          isLoading: false,
          isError: null,
          msg:action?.payload?.msg
        };
  
      case DELETE_TASK_SUCCSESS:
        const filteredTasks = state.tasks.filter(
          (task) => task._id !== action.payload.taskId
        );
        return {
          ...state,
          tasks: filteredTasks,
          isLoading: false,
          isError: null,
         msg:action?.payload?.res?.msg
        };
  
      case TASK_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: action.payload,
          msg:action?.payload?.msg
        };
  
      default:
        return state;
    }
  };
  
  export  {reducer};
  