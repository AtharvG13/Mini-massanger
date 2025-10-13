import React from "react";
import { IoSend } from "react-icons/io5";
import UserMessages from "./UserMessages.jsx";

const MessageContainer = () => {
  return (
    <div className="h-screen flex flex-col w-full">
      <div className=" w-full bg-base-200 flex flex-row p-2  border-b boreder-b-white/10 gap-5 rounded-lg">
        <div className="avatar avatar-online ml-2">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
          </div>
        </div>
        <div className=" p-2 ">
          <h2 className="text-white text-lg text-bold">fullname</h2>
        </div>
      </div>

      <div className="py-2 h-full flex flex-col overflow-y-scroll ">
        <UserMessages />
        <UserMessages />
        <UserMessages />
        <UserMessages />
        <UserMessages />
        <UserMessages />
      </div>

      <div className="h-[7rem] flex bg-base-300 items-center p-1 rounded-lg ">
        <input
          type="text"
          placeholder="Type here..."
          className="input input-success input-bordered w-full "
        />
        <div className="text-2xl p-2 px-10 ml-2  border-2 border-[#00D390] hover:cursor-pointer hover:bg-[#00D390] rounded-lg">
          <IoSend />
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
