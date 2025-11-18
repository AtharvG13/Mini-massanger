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
      className={`flex items-center gap-2 p-2 hover:bg-base-300 hover:cursor-pointer rounded-lg ${
        userDetails?._id === selectedUser?._id && "bg-base-300"
      }`}
    >
      <div className="avatar avatar-online">
        <div className="w-12 rounded-full">
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
