import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageContainer from "./home components/MessageContainer.jsx";
import Sidebar from "./home components/Sidebar.jsx";
import { getOtherUsersThunk } from "../../store/slice/User/user.Thunk";
import {
  initializeSocket,
  getSocket,
} from "../../store/slice/Socket/socket.slice.js";
import { setSelectedUser } from "../../store/slice/User/user.slice.js";

const Home = () => {
  const dispatch = useDispatch();

  const { screenLoading, selectedUser, isAuthenticated, userProfile } =
    useSelector((state) => state.userReducer);

  const { onlineUsers } = useSelector((state) => state.socketReducer);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  /* ------------ INITIALIZE SOCKET ONCE ------------ */
  useEffect(() => {
    if (!isAuthenticated || !userProfile?._id) return;

    dispatch(initializeSocket(String(userProfile._id)));
  }, [isAuthenticated, userProfile?._id, dispatch]);

  /* ------------ FETCH USERS & RESIZE ------------ */
  useEffect(() => {
    dispatch(getOtherUsersThunk());

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  if (screenLoading) return null;

  const isSelectedUserOnline = selectedUser
    ? onlineUsers.includes(String(selectedUser._id))
    : false;

  /* ================= MOBILE ================= */
  if (isMobile) {
    return (
      <div className="w-full h-screen bg-base-300 overflow-hidden">
        {!selectedUser && <Sidebar />}

        {selectedUser && (
          <div className="relative w-full h-full">
            <button
              onClick={() => dispatch(setSelectedUser(null))}
              className="absolute top-3 left-3 z-50 bg-gray-700 text-white px-3 py-1 rounded-lg"
            >
              ← Back
            </button>

            <MessageContainer
              isOnline={isSelectedUserOnline}
              socket={getSocket()}
            />
          </div>
        )}
      </div>
    );
  }

  /* ================= DESKTOP ================= */
  return (
    <div className="flex w-full h-screen bg-base-300 overflow-hidden">
      <div className={`${selectedUser ? "w-[23%]" : "w-full"} h-screen`}>
        <Sidebar />
      </div>

      {selectedUser && (
        <div className="hidden md:flex w-[77%] h-screen">
          <MessageContainer
            isOnline={isSelectedUserOnline}
            socket={getSocket()}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
