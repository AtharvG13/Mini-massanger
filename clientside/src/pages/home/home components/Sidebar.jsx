import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Myusers from "./Myusers.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../../../store/slice/User/user.Thunk";
import { useNavigate } from "react-router-dom";
import { closeSocket } from "../../../store/slice/Socket/socket.slice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);
  const { unreadCounts } = useSelector((state) => state.messageReducer);

  const [showLogout, setShowLogout] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);

  const handleLogout = async () => {
    try {
      // ✅ 1. CLOSE SOCKET FIRST
      closeSocket();

      // ✅ 2. LOGOUT USER
      await dispatch(logoutUserThunk()).unwrap();

      // ✅ 3. REDIRECT
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;
      if (currentScrollY < lastScrollY.current) {
        setShowLogout(true); // scrolling up
      } else {
        setShowLogout(false); // scrolling down
      }
      lastScrollY.current = currentScrollY;
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter users based on search query
  const filteredUsers = (otherUsers || []).filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-base-200 relative overflow-hidden">
      {/* Header + Search */}
      <div className="sticky top-0 z-10 bg-base-200">
        <div className="flex justify-center items-center p-1">
          <h1 className="text-2xl md:text-3xl font-bold text-success underline">
            Chatifyyy...
          </h1>
        </div>
        <div className="p-3">
          <label className="input rounded-2xl flex items-center gap-4 w-[90%] max-w-md mx-auto">
            <input
              type="search"
              placeholder="Search"
              className="grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IoSearch />
          </label>
        </div>
      </div>

      {/* Scrollable user list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 space-y-2">
        {filteredUsers.map((userDetails) => (
          <Myusers
            key={userDetails._id}
            userDetails={userDetails}
            newMessagesCount={unreadCounts?.[userDetails._id] || 0}
          />
        ))}
      </div>

      {/* Logout section */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-base-300 h-[5rem] flex items-center justify-between p-4 transition-all duration-300 z-20 ${
          showLogout
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="avatar flex flex-row items-center space-x-5">
          <div className="ring-success ring-offset-base-100 w-11 rounded-full ring-2 ring-offset-2">
            <img src={userProfile?.avatar} alt="profile" />
          </div>
          <h2 className="text-white text-base md:text-lg font-bold">
            {userProfile?.username}
          </h2>
        </div>

        <button
          className="btn btn-outline btn-success btn-sm py-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
