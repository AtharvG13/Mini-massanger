import React, { useEffect } from "react";
import UserMessages from "./UserMessages.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getMessageThunk } from "../../../store/slice/Message/message.thunk.js";
import SendMessage from "./SendMessage.jsx";

const MessageContainer = ({ isOnline }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  /* -------- FETCH MESSAGES -------- */
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser._id }));
    }
  }, [selectedUser?._id, dispatch]);

  /* -------- GROUP MESSAGES BY DATE -------- */
  const groupMessagesByDate = (msgs) => {
    const grouped = {};
    msgs.forEach((msg) => {
      if (!msg?.createdAt) return;
      const key = new Date(msg.createdAt).toDateString();
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(msg);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages || []);

  return (
    <div className="w-full h-screen flex flex-col md:max-w-[90%] mx-auto">
      {/* Header */}
      <div className="w-full bg-base-200 flex items-center p-3 md:p-4 border-b border-white/10">
        <div className="flex w-full items-center justify-center md:justify-start gap-3">
          {/* Avatar */}
          <div className={`avatar ${isOnline ? "online" : "offline"}`}>
            <div className="w-10 md:w-12 lg:w-12  rounded-full  ring-secondary ring-offset-base-100 ring-2 ring-offset-2">
              <img src={selectedUser.avatar} alt="avatar" />
            </div>
          </div>

          {/* User info */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-white font-semibold text-sm md:text-base lg:text-lg">
              {selectedUser.username}
            </h2>
            <span
              className={`text-xs md:text-sm ${
                isOnline ? "text-green-400" : "text-gray-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 md:px-4 py-2 md:py-4 space-y-4 relative">
        {Object.keys(groupedMessages).map((dateKey) => (
          <div key={dateKey}>
            {/* Sticky day separator */}
            <div className="sticky top-2 z-20 flex justify-center my-2">
              <span className="bg-gray-600 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow">
                {dateKey}
              </span>
            </div>

            {groupedMessages[dateKey].map((msg) => (
              <UserMessages key={msg._id} messageDetails={msg} />
            ))}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-base-200 p-2 md:p-3 lg:p-4">
        <SendMessage />
      </div>
    </div>
  );
};

export default MessageContainer;
