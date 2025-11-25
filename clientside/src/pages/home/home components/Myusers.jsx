import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../../store/slice/User/user.slice";

const Myusers = ({ userDetails }) => {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.userReducer);

  const handleOnUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  };

  return (
    <div
      onClick={handleOnUserClick}
      className={`flex items-center gap-4 p-2 hover:bg-gray-700 hover:cursor-pointer border-2 border-black rounded-lg  ${
        userDetails?._id === selectedUser?._id && "bg-gray-700"
      }`}
    >
      <div className="avatar avatar-online">
        <div className="w-12 rounded-full ring-primary ring-offset-base-100  ring-2 ring-offset-2">
          <img src={userDetails?.avatar} />
        </div>
      </div>
      <div>
        <h2 className="text-success line-clamp-1">{userDetails?.fullname}</h2>
        <p className="text-success text-xs">{userDetails?.username}</p>
      </div>
    </div>
  );
};

export default Myusers;
