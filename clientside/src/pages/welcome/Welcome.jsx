import React from "react";
import Navbar from "./Welcome components/Navbar.jsx";
import Hero1 from "./Welcome components/Hero1.jsx";
import Hero2 from "./Welcome components/Hero2.jsx";
import Footer from "./Welcome components/Footer.jsx";

const Welcome = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-[url('./public/Welcome.jpg')] bg-cover bg-center bg-no-repeat flex flex-col justify-evenly space-y-4">
        <div className="w-full p-5 fixed top-0 left-0 z-50">
          <Navbar />
        </div>

        <div className="flex flex-col items-center justify-center h-full pt-20 px-4 text-center">
          <Hero1 />
        </div>
      </div>

      <div className="min-h-screen w-full bg-[url('./public/Welcome_02.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 text-center">
        <Hero2 />
      </div>

      <div className="rounded-3xl overflow-hidden px-4 py-6 bg-base-200">
        <Footer />
      </div>
    </>
  );
};

export default Welcome;
