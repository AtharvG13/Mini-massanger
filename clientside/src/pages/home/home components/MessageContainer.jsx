import React, { useEffect } from "react";
import UserMessages from "./UserMessages.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getMessageThunk } from "../../../store/slice/Message/message.Thunk";
import SendMessage from "./SendMessage.jsx";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessageThunk({ receiverId: selectedUser._id }));
    }
  }, [selectedUser, dispatch]);

  if (!selectedUser) return null;

  return (
    <div className="w-full h-screen flex flex-col md:max-w-[90%] mx-auto">
      {/* Header */}
      <div className="w-full bg-base-200 flex items-center gap-3 p-2 border-b border-white/10 rounded-lg justify-center md:justify-start">
        <div className="avatar avatar-online">
          <div className="w-10 md:w-12 rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
            <img
              src={selectedUser?.avatar}
              alt="User avatar"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="text-white text-base md:text-lg font-bold text-center md:text-left">
            {selectedUser?.username}
          </h2>
        </div>
      </div>

      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto py-2 px-2 md:px-4 space-y-2">
        {messages?.map((messageDetails) => (
          <UserMessages
            key={messageDetails?._id}
            messageDetails={messageDetails}
          />
        ))}
      </div>

      {/* Sticky input section */}
      <div className="sticky bottom-0 bg-base-300 flex items-center p-2 md:p-4 rounded-t-lg z-10">
        <SendMessage />
      </div>
    </div>
  );
};

export default MessageContainer;
