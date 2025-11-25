import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageContainer from "./home components/MessageContainer.jsx";
import Sidebar from "./home components/Sidebar.jsx";
import { getOtherUsersThunk } from "../../store/slice/User/user.Thunk";

const Home = () => {
  const dispatch = useDispatch();
  const { screenLoading, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    dispatch(getOtherUsersThunk());

    // Track screen resizing (live mobile/desktop switch)
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  if (screenLoading) return null;

  /* ---------- MOBILE VIEW LOGIC ---------- */
  if (isMobile) {
    return (
      <div className="w-full h-screen bg-base-300 overflow-hidden">
        {/* If no user selected → show Sidebar */}
        {!selectedUser && (
          <div className="w-full h-full">
            <Sidebar />
          </div>
        )}

        {/* If a user is selected → show MessageContainer fullscreen */}
        {selectedUser && (
          <div className="relative w-full h-full">
            {/* BACK BUTTON */}
            <button
              onClick={() => window.location.reload()}
              className="absolute top-3 left-3 z-50 bg-gray-700 text-white px-3 py-1 rounded-lg shadow"
            >
              ← Back
            </button>

            <MessageContainer />
          </div>
        )}
      </div>
    );
  }

  /* ---------- DESKTOP VIEW (Same as your existing working layout) ---------- */
  return (
    <div className="flex w-full h-screen bg-base-300 overflow-hidden">
      <div
        className={`${
          selectedUser
            ? "w-full md:w-[23%]"
            : "w-full flex items-center justify-center"
        } h-screen`}
      >
        <div
          className={selectedUser ? "" : "w-[60%] bg-gray-600 rounded-2xl p-3"}
        >
          <Sidebar />
        </div>
      </div>

      {selectedUser && (
        <div className="hidden md:flex w-[77%] h-screen">
          <MessageContainer />
        </div>
      )}
    </div>
  );
};

export default Home;
