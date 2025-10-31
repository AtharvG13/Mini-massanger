import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
const Signup = () => {
  const [signup, setSignup] = useState({
    fullname: "",
    username: "",
    password: "",
    gender: "",
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
          <FaUserPen />
          <input
            type="text"
            name="fullname"
            className="grow"
            placeholder="Enter Your Fullname"
            onChange={handleSignup}
          />
        </label>

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
            type="password"
            className="grow"
            placeholder="Enter Your Password"
            onChange={handleSignup}
          />
        </label>

        <label className="text-[#8CA3A3] font-semibold ml-2">
          Select Gender
          <div className="flex items-center gap-2 justify-evenly p-2">
            <label className="">
              <input
                type="radio"
                name="gender"
                value="male"
                className="radio radio-xs radio-success mr-2"
                onChange={handleSignup}
              />
              male
            </label>

            <label className="">
              <input
                type="radio"
                name="gender"
                value="female"
                className="radio radio-xs radio-success mr-2"
                onChange={handleSignup}
              />
              female
            </label>

            <label className="">
              <input
                type="radio"
                name="gender"
                value="others"
                className="radio radio-xs radio-success mr-2"
                onChange={handleSignup}
              />
              others
            </label>
          </div>
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
