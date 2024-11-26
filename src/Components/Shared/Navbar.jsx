import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Superadminservice from "../../services/SuperadminService";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = ({ toggleswp }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Superadminservice.logout()
      .then((response) => {
        toast.success(response.data.message || "Logged out successfully", {
          position: "top-right",
        });
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

  const toggleHandle = () => {
    toggleswp();
  };

  return (
    <div className="navbar bg-white text-violet-700 shadow-md">
      <div className="flex-1 flex items-center">
        <div className="py-3 flex items-center">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={toggleHandle}
          />
        </div>
        <Link to="/" className="text-xl font-bold ml-4">
          Nap Foody
        </Link>
      </div>
      <div className="flex-none flex items-center gap-4">
        {/* Notification Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:bg-violet-100"
          >
            <div className="indicator">
              <IoIosNotifications size={22} />
              <span className="badge badge-sm bg-violet-700 text-white">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-white z-[1] mt-3 w-52 shadow"
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

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-violet-100"
          >
            <div className="w-10 rounded-full">
              <img alt="Refat" src="public/Assets/Image/Navbar/refat.jpg" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="hover:bg-violet-100">Profile</a>
            </li>
            <li>
              <a className="hover:bg-violet-100">Settings</a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="py-2 px-4 text-left text-violet-700 bg-red-100 hover:bg-red-200 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
