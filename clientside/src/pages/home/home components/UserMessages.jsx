import React from "react";
import { useSelector } from "react-redux";

const UserMessages = ({ messageDetails }) => {
  const { userProfile, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  const isSender = userProfile?._id === messageDetails?.senderId;
  const avatarSrc = isSender ? userProfile?.avatar : selectedUser?.avatar;

  return (
    <div
      className={`chat ${
        isSender ? "chat-end" : "chat-start"
      } px-2 py-1 md:px-4`}
    >
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-8 md:w-10 rounded-full ring-info   ring-offset-base-100 ring-2 ring-offset-2">
          <img src={avatarSrc} alt="avatar" className="object-cover" />
        </div>
      </div>

      {/* Header with timestamp */}
      <div className="chat-header text-xs md:text-sm text-white/70">
        <time>{messageDetails?.time}</time>
      </div>

      {/* Message bubble */}
      <div
        className={`chat-bubble bg-slate-700 text-sm md:text-base break-words max-w-[80%] md:max-w-[60%]`}
      >
        {messageDetails?.message}
      </div>

      {/* Footer with status */}
      <div className="chat-footer text-xs md:text-sm text-white/50">
        {messageDetails?.status}
      </div>
    </div>
  );
};

export default UserMessages;
