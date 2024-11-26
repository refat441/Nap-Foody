import React, { useEffect, useState } from "react";
import { MdOutlineDashboard, MdCategory } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = ({ togle, toggleswp }) => {
  const [activeMenu, setActiveMenu] = useState("");

  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Category", link: "/category", icon: MdCategory },
    { name: "messages", link: "/", icon: FiMessageSquare },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/", icon: FiFolder },
    { name: "Cart", link: "/", icon: FiShoppingCart },
    { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];

  useEffect(() => {
    document.getElementById("root").style.overflow = togle
      ? "hidden"
      : "visible";
  }, [togle]);

  return (
    <section className="flex gap-6 h-full">
      <div
        className={`bg-white h-full ${
          togle ? "w-60" : "w-60 sm:w-16"
        } duration-500 text-gray-500 px-4 shadow-md`}
      >
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <Link
              to={menu.link}
              key={i}
              onClick={() => setActiveMenu(menu.name)} // Set active menu
              className={`${
                menu.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md ${
                activeMenu === menu.name
                  ? "bg-violet-100 text-violet-700 font-bold" // Active styles
                  : "hover:bg-gray-200" // Gray hover remains
              }`}
            >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <div>
                <h2
                  style={{
                    transitionDelay: `${i + 0}00ms`,
                  }}
                  className={`whitespace-pre hidden sm:block duration-00 ${
                    !togle && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu.name}
                </h2>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre block sm:hidden duration-00`}
                  onClick={toggleswp}
                >
                  {menu.name}
                </h2>
              </div>
              <h2
                className={`${
                  togle && "hidden"
                } absolute left-48 bg-violet-100 font-semibold whitespace-pre text-violet-700 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
