import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../../store/slice/Message/message.thunk";
import { IoSend } from "react-icons/io5";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await dispatch(
      sendMessageThunk({
        receiverId: selectedUser._id,
        message: message.trim(),
      })
    );

    setMessage("");
  };

  return (
    <form onSubmit={handleSend} className="flex gap-2 w-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="input input-success input-bordered flex-1"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="btn btn-success"
      >
        Send
      </button>
    </form>
  );
};
export default SendMessage;
