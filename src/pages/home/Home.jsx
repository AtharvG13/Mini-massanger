import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageContainer from "./home components/MessageContainer.jsx";
import Sidebar from "./home components/Sidebar.jsx";
import { getOtherUsersThunk } from "../../store/slice/User/user.Thunk";

const Home = () => {
  const dispatch = useDispatch();
  const { screenLoading } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getOtherUsersThunk());
    // Push current state to history
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Prevent back navigation
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (screenLoading) return null;

  return (
    <div className="flex w-full h-screen bg-base-200 overflow-hidden">
      <Sidebar /> {/* Sidebar component */}
      <MessageContainer /> {/* MessageContainer component */}
    </div>
  );
};

export default Home;
