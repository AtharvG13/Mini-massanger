import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();

    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(login);

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
            onChange={handleLogin}
          />
        </label>
        <label className="input input-bordered flex items-center  w-full">
          <RiLockPasswordFill />
          <input
            name="password"
            type="text"
            className="grow"
            placeholder="Enter Your Password"
            onChange={handleLogin}
          />
        </label>
        <button className="btn  btn-success mt-5">Login</button>
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
