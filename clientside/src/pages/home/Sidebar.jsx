import React from "react";
import { IoSearch } from "react-icons/io5";
import Myusers from "./Myusers.jsx";

const Sidebar = () => {
  return (
    <div className="max-w-[22rem] w-full h-screen flex flex-col">
      <div className="justify-center flex items-center p-1">
        <h1 className="text-3xl font-bold text-success underline">
          Chatifyyy...
        </h1>
      </div>
      <div className="p-3  justify-content-center ">
        <label className="input  rounded-2xl">
          <input type="search" required placeholder="Search" />
          <IoSearch />
        </label>
      </div>
      <div className="h-full overflow-y-scroll px-2">
        <Myusers />
        <Myusers />
        <Myusers />
        <Myusers />
        <Myusers />
        <Myusers />
        <Myusers />
        <Myusers />
        <Myusers />
        <Myusers />
      </div>
      <div className="h-[3rem] flex items-center justify-between p-4 bg-base-300">
        {" "}
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
          </div>
        </div>
        <button className="btn btn-outline btn-success btn-sm py-3">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
