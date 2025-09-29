import React from "react";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
const Login = () => {
  return (
    <div className="flex items-center h-screen justify-center   p-10">
      <div className="  max-w-md w-full flex flex-col gap-6 bg-base-200 p-10 rounded-lg">
        <h2 className="text-2xl font-bold text-success mb-2">Please Login </h2>

        <label className="input input-bordered flex items-center  w-full">
          <FaUserTie />
          <input type="text" className="grow" placeholder="Enter Your Name" />
        </label>
        <label className="input input-bordered flex items-center  w-full">
          <RiLockPasswordFill />
          <input
            type="text"
            className="grow"
            placeholder="Enter Your Password"
          />
        </label>
        <button className="btn btn-dash btn-success mt-5">Submit</button>
        <p>
          Don't have an account?
          <Link to={"/signup"} className="text-success underline">
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
