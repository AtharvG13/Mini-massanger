import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-3xl p-3 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="btn btn-ghost text-2xl font-bold text-success underline"
      >
        Chatifyyy...
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 text-lg font-bold text-white">
        <Link className="hover:underline hover:text-success">menu</Link>
        <Link className="hover:underline hover:text-success">about us</Link>
        <Link to="/login" className="hover:underline hover:text-success">
          login
        </Link>
        <Link to="/signup" className="hover:underline hover:text-success">
          signup
        </Link>
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-3xl"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Logout Button */}
      <div className="hidden md:block mr-2">
        <button className="btn btn-outline btn-success rounded-lg">
          Logout
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-base-100 shadow-md rounded-b-3xl z-40 flex flex-col items-center py-4 space-y-4 text-white font-bold text-lg md:hidden">
          <Link
            onClick={() => setIsOpen(false)}
            className="hover:underline hover:text-success"
          >
            menu
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="hover:underline hover:text-success"
          >
            about us
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="hover:underline hover:text-success"
          >
            login
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="hover:underline hover:text-success"
          >
            signup
          </Link>
          <button className="btn btn-outline btn-success rounded-lg">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
