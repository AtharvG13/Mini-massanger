import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

const UserMessages = ({ messageDetails }) => {
  const { userProfile, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  const messageRef = useRef(null);
  const isSender = messageDetails?.senderId === userProfile?._id;

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageDetails?._id]);

  if (!userProfile?._id) return null;

  // Format time only
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Render ticks based on message status
  const renderTicks = () => {
    if (!isSender) return null; // only show ticks for sender
    switch (messageDetails?.status) {
      case "sent":
        return <IoCheckmark className="text-gray-300 text-2xl" />;
      case "delivered":
        return <IoCheckmarkDone className="text-gray-300 text-2xl" />;
      case "read":
        return <IoCheckmarkDone className="text-blue-600 text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={messageRef}
      className={`chat ${isSender ? "chat-end" : "chat-start"}`}
    >
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="avatar"
            src={isSender ? userProfile.avatar : selectedUser?.avatar}
          />
        </div>
      </div>

      {/* Bubble */}
      <div
        className={`chat-bubble rounded-xl ${
          isSender ? "bg-green-700 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {messageDetails?.message}
      </div>
      {/* Footer with time + ticks */}
      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] opacity-70">
        <span>{formatTime(messageDetails?.createdAt)}</span>
        {renderTicks()}
      </div>
    </div>
  );
};

export default UserMessages;
