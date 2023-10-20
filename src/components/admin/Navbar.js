import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiCameraMovie, BiLogOut } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../../hooks";

export default function Navbar() {
  const { handleLogout } = useAuth();

  return (
    <div>
      <nav className="w-56 min-h-screen dark:bg-neutral-800 bg-slate-200 drop-shadow-lg dark:shadow-gray-300 shadow-black border-gray-300 px-3 py-5 flex flex-col justify-between">
        <div>
          <div className="bg-blue-800 py-1 px-6 w-32 rounded-3xl hover:drop-shadow-xl hover:-translate-y-0.5 transition">
            <Link to="/">
              <img src="./logo.png" alt="" className="h-10" />
            </Link>
          </div>
          <ul className="mt-5 space-y-5">
            <li>
              <NavItem to="/">
                
                <AiOutlineHome /> <span>Home</span>
              </NavItem>
            </li>
            <li>
              <NavItem to="/movies">
                
                <BiCameraMovie /> <span>Movie</span>
              </NavItem>
            </li>
            <li>
              <NavItem to="/actors">
                
                <FaRegUser /> <span>Actor</span>
              </NavItem>
            </li>
          </ul>
        </div>
        <div className="flex justify-between text-lg">
          <div className="font-semibold dark:text-gray-400 hover:dark:text-gray-100 text-gray-600 hover:text-black">
            Admin
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 dark:text-gray-400 hover:dark:text-gray-100 text-gray-600 hover:text-black transition"
          >
            <BiLogOut /> <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

const NavItem = ({ children, to }) => {
  const commonClasses =
    " flex items-center text-lg space-x-4 p-2 hover:opacity-80";

  return (
    <NavLink
      className={({ isActive }) =>
        (isActive
          ? "dark:text-white text-black"
          : "dark:text-gray-400 text-gray-600") + commonClasses
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
