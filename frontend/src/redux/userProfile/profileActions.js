// profileActions.js

import axios from 'axios';
import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  EDIT_USER_PROFILE_REQUEST,
  EDIT_USER_PROFILE_SUCCESS,
  EDIT_USER_PROFILE_FAILURE,
} from './profileActionTypes';

const BASE_URL = process.env.REACT_APP_BASEURL;

// Action creators for getting user profile
export const getUserProfileRequest = () => ({
  type: GET_USER_PROFILE_REQUEST,
});

export const getUserProfileSuccess = (profileData) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: profileData,
});

export const getUserProfileFailure = (error) => ({
  type: GET_USER_PROFILE_FAILURE,
  payload: error,
});

// Thunk to fetch user profile
export const getUserProfile = async (dispatch ) => {
  dispatch(getUserProfileRequest());

  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(BASE_URL + '/users/profile', config);
    console.log(response);
    dispatch(getUserProfileSuccess(response.data));
  } catch (error) {
    console.log(error)
    dispatch(getUserProfileFailure(error.message));
  }
};

// Action creators for editing user profile
export const editUserProfileRequest = () => ({
  type: EDIT_USER_PROFILE_REQUEST,
});

export const editUserProfileSuccess = (updatedProfileData) => ({
  type: EDIT_USER_PROFILE_SUCCESS,
  payload: updatedProfileData,
});

export const editUserProfileFailure = (error) => ({
  type: EDIT_USER_PROFILE_FAILURE,
  payload: error,
});

// Thunk to edit user profile
export const editUserProfile = (updatedProfileData) => async (dispatch) => {
  dispatch(editUserProfileRequest());

  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(BASE_URL + '/users/profile', updatedProfileData, config);
    dispatch(editUserProfileSuccess(response.data));
    console.log(response)
  } catch (error) {
    console.log(error)
    dispatch(editUserProfileFailure(error.message));
  }
};
