import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/User/user.Thunk";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/home");
    }
  };
  return (
    <div className="flex items-center h-screen justify-center p-10">
      <div className="max-w-md w-full flex flex-col gap-6 bg-base-200 p-10 rounded-lg">
        <h2 className="text-2xl font-bold text-success mb-2">Please Login</h2>

        <label className="input input-bordered flex items-center w-full">
          <FaUserTie />
          <input
            type="text"
            name="username"
            autoComplete="username"
            className="grow"
            placeholder="Enter Username"
            onChange={handleInputChange}
            value={loginData.username}
            required
          />
        </label>

        <label className="input input-bordered flex items-center w-full">
          <FaKey />
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            className="grow"
            placeholder="Enter Your Password"
            onChange={handleInputChange}
            value={loginData.password}
            required
          />
        </label>

        <button className="btn  btn-success mt-5" onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have an account?
          <Link to="/signup" className="text-success underline">
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
