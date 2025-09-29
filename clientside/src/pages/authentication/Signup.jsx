import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
const Signup = () => {
  const [signup, setSignup] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleSignup = (e) => {
    e.preventDefault();

    setSignup((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(signup);
  return (
    <div className="flex items-center h-screen justify-center   p-10">
      <div className="  max-w-md w-full flex flex-col gap-6 bg-base-200 p-10 rounded-lg">
        <h2 className="text-2xl font-bold text-success mb-2">
          Please Signup!!{" "}
        </h2>

        <label className="input input-bordered flex items-center  w-full">
          <FaUserTie />
          <input
            type="text"
            name="username"
            className="grow"
            placeholder="Enter Username"
            onChange={handleSignup}
          />
        </label>
        <label className="input input-bordered flex items-center  w-full">
          <RiLockPasswordFill />
          <input
            name="password"
            type="text"
            className="grow"
            placeholder="Enter Your Password"
            onChange={handleSignup}
          />
        </label>
        <label className="input input-bordered flex items-center  w-full">
          <RiLockPasswordFill />
          <input
            type="text"
            name="confirmPassword"
            className="grow"
            placeholder="Confirm Password"
            onChange={handleSignup}
          />
        </label>
        <button className="btn  btn-success mt-5">Signup</button>
        <p>
          Already have an account?
          <Link to={"/login"} className="text-success underline">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
