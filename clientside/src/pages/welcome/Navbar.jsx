import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-3xl p-3 flex justify-between ">
      <a className="btn btn-ghost text-2xl font-bold text-success underline ">
        Chatifyyy...
      </a>
      <div className=" flex justify-center space-x-8 text-lg font-bold text-white  md:block ">
        <Link className="hover:underline hover:cursor-pointer hover:text-success">
          menu
        </Link>
        <Link className="hover:underline hover:cursor-pointer hover:text-success">
          about us
        </Link>
        <Link
          to={"/login"}
          className="hover:underline hover:cursor-pointer hover:text-success"
        >
          login
        </Link>
        <Link
          to={"/signup"}
          className="hover:underline hover:cursor-pointer hover:text-success"
        >
          signup
        </Link>
      </div>
      <div className="mr-2">
        <button className="btn btn-outline btn-success rounded-lg">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
