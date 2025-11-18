import React from "react";
import { IoSend } from "react-icons/io5";
import UserMessages from "./UserMessages.jsx";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser } = useSelector((state) => state.userReducer);

  return (
    <div className="hidden w-full  max-w-[75%]  md:flex h-screen  flex-col">
      {/* Header */}
      <div className="w-full bg-base-200 flex flex-row p-2 border-b border-white/10 gap-5 rounded-lg">
        <div className="avatar avatar-online ml-2">
          <div className="w-12 rounded-full">
            <img src={selectedUser?.avatar} />
          </div>
        </div>
        <div className="p-2">
          <h2 className="text-white text-lg font-bold">
            {selectedUser?.username}
          </h2>
        </div>
      </div>

      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <UserMessages key={i} />
        ))}
      </div>

      {/* Sticky input section */}
      <div className="sticky bottom-0 bg-base-300 h-[6rem] flex items-center p-1 rounded-lg z-10">
        <input
          type="text"
          placeholder="Type here..."
          className="input input-success input-bordered w-full"
        />
        <div className="text-2xl p-2 px-10 ml-2 border-2 border-[#00D390] hover:cursor-pointer hover:bg-[#00D390] rounded-lg">
          <IoSend />
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
