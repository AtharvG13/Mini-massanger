import React from "react";
import { IoSearch } from "react-icons/io5";
import Myusers from "./Myusers.jsx";

const Sidebar = () => {
  return (
    <div className="w-full md:max-w-[22%] md:flex flex-col h-screen bg-base-200">
      {/* Sticky Header + Search */}
      <div className="sticky top-0 z-10 bg-base-200">
        {/* Header */}
        <div className="flex justify-center items-center p-1">
          <h1 className="text-3xl font-bold text-success underline">
            Chatifyyy...
          </h1>
        </div>

        {/* Search */}
        <div className="p-3">
          <label className="input rounded-2xl flex items-center gap-2 w-[90%] max-w-md mx-auto">
            <input
              type="search"
              required
              placeholder="Search"
              className="grow"
            />
            <IoSearch />
          </label>
        </div>
      </div>

      {/* Scrollable user list */}
      <div className="flex-1 overflow-y-auto px-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Myusers key={i} />
        ))}
      </div>

      {/* Sticky Logout section */}
      <div className="sticky bottom-0 bg-base-300 h-[3rem] flex items-center justify-between p-4">
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
