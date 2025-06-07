import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../config/userProvider";
import {
  FaBell,
  FaCalendar,
  FaTachometerAlt,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const Sidebar = () => {
  const { userData } = useUser();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const updatedOpenDropdowns = {};
    NavigationData.forEach((item) => {
      if (
        item.subMenu &&
        item.subMenu.some((subItem) => subItem.location === location.pathname)
      ) {
        updatedOpenDropdowns[item.title] = true;
      }
    });
    setOpenDropdowns(updatedOpenDropdowns);
  }, [location.pathname, userData]);

  const toggleDropdown = (title) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const permissions = userData?.permissions || [];

  const NavigationData = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      location: "/dashboard",
    },
    {
      title: "Tasks",
      icon: <FaCalendar />,
      location: "/tasks",
    },
    {
      title: "Notifications",
      icon: <FaBell />,
      location: "/notifications",
    },
    {
      title: "Settings",
      icon: <FaGear />,
      location: "/account",
    },
  ];


  console.log("first_name",userData);
  return (
    <>
      {userData?.userType === "master" ? (
        <div className="flex flex-col gap-1 items-center w-full h-full overflow-y-scroll py-2 hide-scrollbar">
          {NavigationData.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `px-2 py-2 rounded-sm w-full flex border border-transparent items-center gap-1.5 
              text-sm ${
                isActive
                  ? " text-[#4B49AC] bg-white "
                  : "hover:bg-[#7978e9] text-white"
              }`
              }
              to={item.location}
            >
              <span className="text-xl">{item.icon}</span>
              <p className="sm:hidden lg:block">{item.title}</p>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1 items-center w-full h-full overflow-y-scroll py-2 hide-scrollbar">
          {NavigationData.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg w-full flex items-center gap-2
            text-sm ${
              isActive
                ? "bg-[#d8c9ae] text-[#575757]"
                : "hover:bg-[#7978e9] text-[#d8c9ae]"
            }`
              }
              to={item.location}
            >
              <span className="text-xl">{item.icon}</span>
              <p className="sm:hidden lg:block">{item.title}</p>
            </NavLink>
          ))}
        </div>
      )}
      <div
        onClick={() => navigate("/account")}
        className="flex text-white items-center gap-3 cursor-pointer px-3 py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors border w-full"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 text-white uppercase">
          {userData?.first_name?.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm truncate">
            {userData?.first_name} {userData?.last_name}
          </span>
          <span className="font-medium text-[9px] ">{userData?.email}</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;