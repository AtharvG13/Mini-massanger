import React from "react";
import { IoSend } from "react-icons/io5";

const MessageContainer = () => {
  return (
    <div className="h-screen flex flex-col w-full">
      <div className=" w-full bg-base-200 flex flex-row p-2  border-b boreder-b-white/10 gap-5">
        <div className="avatar avatar-online ml-2">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
          </div>
        </div>
        <div className=" p-2 ">
          <h2 className="text-white text-lg text-bold">fullname</h2>
        </div>
      </div>

      <div className="py-2 h-screen overflow-y-scroll ">
        <div className="chat chat-start">
          <div className="avatar avatar-online ml-2">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>

        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>

      <div className="h-[7rem] flex bg-base-200 items-center p-2 ">
        <input
          type="text"
          placeholder="Type here..."
          className="input input-success input-bordered w-full "
        />
        <div className="text-3xl p-2 ml-2  border-2 border-[#00D390] ">
          <IoSend />
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
