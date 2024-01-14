// profileReducer.js

import {
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILURE,
    EDIT_USER_PROFILE_REQUEST,
    EDIT_USER_PROFILE_SUCCESS,
    EDIT_USER_PROFILE_FAILURE,
  } from './profileActionTypes';
  
  const initialState = {
    userProfile: {},
    isLoading: false,
    error: null,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_PROFILE_REQUEST:
      case EDIT_USER_PROFILE_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
  
      case GET_USER_PROFILE_SUCCESS:
        return {
          ...state,
          userProfile: action.payload,
          isLoading: false,
          error: null,
        };
        case EDIT_USER_PROFILE_SUCCESS:
        return {
          ...state,
          userProfile: action?.payload?.userProfile
          ,
          isLoading: false,
          error: null,
          msg:action?.payload?.message
        };
  
      case GET_USER_PROFILE_FAILURE:
      case EDIT_USER_PROFILE_FAILURE:
        return {
          ...state,
          userProfile: {},
          isLoading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default profileReducer;
  