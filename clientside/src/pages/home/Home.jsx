import React from "react";
import Sidebar from "./Sidebar.jsx";
import MessageContainer from "./MessageContainer.jsx";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
