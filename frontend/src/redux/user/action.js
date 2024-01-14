import axios from "axios";
import {
  POST_USER_ERROR,
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
} from "./actiontype";
const BASE_URL = process.env.REACT_APP_BASEURL;
const login = (data) => async (dispatch) => {
  return await axios.post(BASE_URL + "/users/login", data);
};
const register = (data) => async (dispatch) => {
  return await axios.post(BASE_URL + "/users/register", data);
};
// Action Creators
const fetchUsersRequest = () => ({
  type: POST_USER_REQUEST,
});

const fetchUsersSuccess = (data) => ({
  type: POST_USER_SUCCESS,
  payload: data,
});

const fetchUsersFailure = (error) => ({
  type: POST_USER_ERROR,
  payload: error,
});

export {
  login,
  register,
  fetchUsersFailure,
  fetchUsersSuccess,
  fetchUsersRequest,
};
