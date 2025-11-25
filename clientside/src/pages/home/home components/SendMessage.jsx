import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../../store/slice/Message/message.Thunk";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [Message, setMessage] = useState("");

  const handleMessage = (e) => {
    e.preventDefault();
    dispatch(
      sendMessageThunk({
        receiverId: selectedUser?._id,
        message: Message,
      })
    );
    setMessage("");
  };

  return (
    <form
      onSubmit={handleMessage}
      className="w-full flex flex-row items-center gap-2 px-2 md:px-4"
    >
      {/* Input Field */}
      <input
        type="text"
        placeholder="Type your message..."
        className="input input-success input-bordered flex-1 text-sm md:text-base"
        value={Message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Send Button */}
      <button
        type="submit"
        disabled={!Message.trim()}
        className={`text-2xl border-2 border-[#00D390] rounded-lg
                    p-2 w-10 h-10 flex items-center justify-center
                    md:px-6 md:py-2 md:w-auto md:h-auto
                    ${
                      !Message.trim()
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:cursor-pointer hover:bg-[#00D390]"
                    }`}
      >
        <IoSend />
      </button>
    </form>
  );
};

export default SendMessage;
