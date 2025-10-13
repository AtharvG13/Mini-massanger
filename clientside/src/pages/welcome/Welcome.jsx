import React from "react";
import Navbar from "./Navbar.jsx";
import Hero1 from "./Hero1.jsx";
import Hero2 from "./Hero2.jsx";
import Footer from "./Footer.jsx";

const Welcome = () => {
  return (
    <>
      <div className="h-screen w-full  bg-[url('./public/Welcome.jpg')]  bg-cover bg-center bg-repeat flex flex-col justify-evenly space-y-4">
        <div className="  w-full p-5 fixed top-0 left-0 z-50">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-evenly  h-full text">
          <Hero1 />
        </div>
      </div>
      <div className="h-screen bg-[url('./public/Welcome_02.jpg')]  bg-cover bg-center">
        <Hero2 />
      </div>
      <div className="rounded-3xl overflow-hidden">
        <Footer />
      </div>
    </>
  );
};

export default Welcome;
