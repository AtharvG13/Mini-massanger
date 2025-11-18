import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { FaKey } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { signupUserThunk } from "../../store/slice/User/user.Thunk";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  const [signup, setSignup] = useState({
    fullname: "",
    username: "",
    password: "",
    gender: "",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    e.preventDefault();

    setSignup((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    const response = await dispatch(signupUserThunk(signup));
    if (response?.payload?.success) {
      navigate("/login");
    }
  };
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
            onChange={handleInputChange}
          />
        </label>

        <label className="input input-bordered flex items-center  w-full">
          <FaUserTie />
          <input
            type="text"
            name="username"
            className="grow"
            placeholder="Enter Username"
            onChange={handleInputChange}
          />
        </label>

        <label className="input input-bordered flex items-center  w-full">
          <FaKey />
          <input
            name="password"
            type="password"
            className="grow"
            placeholder="Enter Your Password"
            onChange={handleInputChange}
          />
        </label>

        <div className="text-[#8CA3A3] font-semibold ml-2">
          Select Gender
          <div className="flex items-center gap-2 justify-evenly p-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                className="radio radio-xs radio-success mr-2"
                onChange={handleInputChange}
              />
              male
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                className="radio radio-xs radio-success mr-2"
                onChange={handleInputChange}
              />
              female
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="others"
                className="radio radio-xs radio-success mr-2"
                onChange={handleInputChange}
              />
              others
            </label>
          </div>
        </div>

        <button className="btn  btn-success mt-5" onClick={handleSignup}>
          Signup
        </button>
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
