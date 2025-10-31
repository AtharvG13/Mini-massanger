import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/User/user.Thunk";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    e.preventDefault();

    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const response = await dispatch(loginUserThunk(login));
    if (response?.payload?.success) {
      navigate("/home");
    }
  };
  return (
    <div className="flex items-center h-screen justify-center   p-10">
      <div className="  max-w-md w-full flex flex-col gap-6 bg-base-200 p-10 rounded-lg">
        <h2 className="text-2xl font-bold text-success mb-2">Please Login </h2>

        <label className="input input-bordered flex items-center  w-full">
          <FaUserTie />
          <input
            type="text"
            name="username"
            className="grow"
            placeholder="Enter  Username"
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center  w-full">
          <RiLockPasswordFill />
          <input
            name="password"
            type="text"
            className="grow"
            placeholder="Enter Your Password"
            onChange={handleInputChange}
          />
        </label>
        <button className="btn  btn-success mt-5" onClick={handleLogin}>
          Login
        </button>
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
