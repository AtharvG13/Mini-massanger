import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Myusers from "./Myusers.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../../../store/slice/User/user.Thunk";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);
  const [showLogout, setShowLogout] = useState(true);
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();
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
        setShowLogout(true); // Scrolling up
      } else {
        setShowLogout(false); // Scrolling down
      }
      lastScrollY.current = currentScrollY;
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-base-200 relative overflow-hidden">
      {/* Sticky Header + Search */}
      <div className="sticky top-0 z-10 bg-base-200">
        <div className="flex justify-center items-center p-1">
          <h1 className="text-3xl font-bold text-success underline">
            Chatifyyy...
          </h1>
        </div>
        <div className="p-3">
          <label className="input rounded-2xl flex items-center gap-4 w-[90%] max-w-md mx-auto">
            <input
              type="search"
              required
              placeholder="Search"
              className="grow"
            />
            <IoSearch />
          </label>
        </div>
      </div>

      {/* Scrollable user list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-2">
        {(otherUsers || []).map((userDetails) => {
          return <Myusers key={userDetails._id} userDetails={userDetails} />;
        })}
      </div>

      {/* Animated Logout section (responsive) */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-base-300 h-[5rem] flex items-center justify-between p-4 transition-all duration-300 z-20 ${
          showLogout
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="avatar flex flex-row align-items-center  space-x-5">
          <div className="ring-success ring-offset-base-100 w-11 rounded-full ring-2 ring-offset-2">
            <img src={userProfile?.avatar} />
          </div>
          <h2 className="text-white text-base md:text-lg font-bold text-center md:text-left py-2">
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
