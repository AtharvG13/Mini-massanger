import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../../store/slice/User/user.slice";

const Myusers = ({ userDetails, newMessagesCount }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);

  const isOnline = onlineUsers?.includes(String(userDetails?._id));

  const handleOnUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  };

  return (
    <div
      onClick={handleOnUserClick}
      className={`flex items-center justify-between gap-4 p-2 hover:bg-gray-700 cursor-pointer border-2 border-black rounded-lg ${
        userDetails?._id === selectedUser?._id ? "bg-gray-700" : ""
      }`}
    >
      {/* Avatar + Info */}
      <div className="flex items-center gap-4">
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-2">
            <img src={userDetails?.avatar} alt={userDetails?.username} />
          </div>
        </div>
        <div>
          <h2 className="text-success line-clamp-1">{userDetails?.fullname}</h2>
          <p className="text-success text-xs">{userDetails?.username}</p>
        </div>
      </div>

      {/* New messages badge */}
      {newMessagesCount > 0 && (
        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          {newMessagesCount} new
        </span>
      )}
    </div>
  );
};

export default Myusers;
