import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Superadminservice from "../../services/SuperadminService";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = ({toggleswp}) => {
  const navigate = useNavigate();

  // Define handleLogout inside the Navbar component
  const handleLogout = () => {
    Superadminservice.logout()
      .then((response) => {
        // Show success toast
        toast.success(response.data.message || "Logged out successfully", {
          position: "top-right",
        });

        // Clear token and navigate to login page
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        toast.error("An error occurred while logging out", {
          position: "top-right",
        });
      });
  };

  const toggleHeandle = () => {
    toggleswp()
  };

  return (
    <div className="navbar bg-[#0e0e0e]">
      <div className="flex-1">
      <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={toggleHeandle}
          />
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Nap Foody
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <IoIosNotifications size={22} />
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Refat" src="public/Assets/Image/Navbar/refat.jpg" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-danger bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
              >
                Logoutt
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
