import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { errorAlert, succesAlert } from "../Notification";
import { ImSpinner9 } from "react-icons/im";
import { Link } from "react-router-dom";
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  isAuth,
  register,
} from "../redux/user/action";
import { useDispatch } from "react-redux";
function Register() {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const RegisterData = async (formData) => {
    setLoading(true);
    try {
      dispatch(fetchUsersRequest());
      let res = await dispatch(register(formData));
      dispatch(fetchUsersSuccess(res?.data));
      succesAlert(res?.data?.msg || "User registration done!");

      setLoading(false);
    } catch (error) {
      dispatch(fetchUsersFailure(error?.response?.data));
      errorAlert(error?.response?.data?.msg);

      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    RegisterData(formData);
    setFormData({
      email: "",
      name: "",
      password: "",
    });
  };
  useEffect(()=>{
    if(localStorage.getItem("token")){
      dispatch(isAuth(true))
    }
  })
  return (
    <div className=" w-full flex justify-center items-center">
      <div className="sm:px-10 px-2 w-full sm:w-1/2 lg:w-1/2 xl-1/3 transition-all">
        <ToastContainer />
        <h1 className="font-mono text-white p-4 text-2xl font-semibold">
          User Register
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto bg-white p-6 rounded-2xl shadow-2xl shadow-red-600 text-left font-mono flex flex-col space-y-5"
        >
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={handleChange}
                type="text"
                name="name"
                value={formData.name}
                id="floating_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={formData.email}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleChange}
              value={formData.password}
              type="password"
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              minLength={"8"}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            disabled={Loading}
            className="text-white flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {Loading ? (
              <ImSpinner9 className="animate-spin text-center text-xl" />
            ) : (
              "Submit"
            )}
          </button>
          <Link to={"/login"} className="underline text-blue-600 text-right">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
