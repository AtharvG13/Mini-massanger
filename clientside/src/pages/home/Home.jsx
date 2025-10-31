import React from "react";

import MessageContainer from "./home components/MessageContainer.jsx";
import Sidebar from "./home components/Sidebar.jsx";
const Home = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen  gap-2  ">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
