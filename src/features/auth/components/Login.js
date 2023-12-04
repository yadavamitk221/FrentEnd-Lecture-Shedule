import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  loginUserAsync,
  selectAuthError,
  selectLoggedInUser,
} from "../authSlice";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const authError = useSelector(selectAuthError);
  const handleLogin = (e) => {
    e.preventDefault();
    const updatedFormData = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    setFormData(updatedFormData);
    console.log("setFormData", formData);
  };

  useEffect(() => {
    const login = async () => {
      try {
        console.log("useEffect form data", formData);
        await dispatch(loginUserAsync(formData));
        setTimeout(() => {
          dispatch(clearAuthError());
        }, 3000);
      } catch (error) {
        dispatch(loginUserAsync(error.message));
      }
    };

    if (formData.email && formData.password) {
      login();
    }
  }, [dispatch, formData]);

  return (
    <>
      {user && <Navigate to={"/"} replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://th.bing.com/th/id/OIP.F0kTZuZx-T-DDdKBJywFHAHaHP?rs=1&pid=ImgDetMain"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleLogin}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          {authError && <p className="text-red-500">{authError.error}</p>}
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
