import React, { useState, useEffect } from "react";
import { useUser } from "../config/userProvider";
import { IoPowerSharp, IoSettingsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { removeCookie } from "../config/webStorage.js";
import { useNavigate, NavLink } from "react-router-dom";
import moment from "moment";
import Notification from "./notification.js";
import { CgProfile } from "react-icons/cg";

const Header = ({ className }) => {
  const {
    openProfile,
    setCloseProfile,
    userData,
    isMenuOpen,
    setIsMenuOpen,
    showSearch,
    setShowSearch,
  } = useUser();
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const logOutHandler = () => {
    removeCookie("swpayrolltoken");
    window.location.reload();
    navigate("/");
  };



  const FormattedDate = () => {
    const currentDate = moment();
    const formattedDate = currentDate.format("dddd, DD MMMM YYYY");

    return <span>{formattedDate}</span>;
  };

  const [isNotificationCartOpen, setIsNotificationCartOpen] = useState(false);

  const notificationCartHandle = () => {
    setIsNotificationCartOpen(!isNotificationCartOpen);
  };

  const [notifications, setNotifications] = useState([]);

  return (
    <div
      className={`bg-white px-3 py-3 flex items-center justify-between w-full border-b border-slate-200`}
    >
      <div className="py-2 md:hidden block cursor-pointer">
        <RxHamburgerMenu onClick={() => setIsMenuOpen(true)} />
      </div>
      <div className="md:flex gap-2 items-center hidden">
        <div>
          <h1 className="text-xs md:text-sm lg:text-lg font-medium capitalize hidden md:block">
            Hi, {userData?.first_name}{" "}
            {userData?.last_name}
          </h1>
          <p className="text-zinc-400 text-[0.55rem]">
            Today is {FormattedDate()}
          </p>
        </div>

        <div className="capitalize bg-blue-50 border-[1px] border-blue-200 rounded-md hidden md:block py-1 px-2 md:px-4 text-blue-500 text-xs">
          {userData?.role}
        </div>
      </div>

      <div className="md:hidden">
        <img src="/task-tracker-blue.png" className="h-12 md:h-16" />
      </div>

      <div className="flex items-center gap-2 lg:gap-4 relative">
        <div
          className="uppercase bg-zinc-100 rounded-full w-7 h-7 lg:w-9 lg:h-9 border border-[#d8c9ae]  overflow-hidden cursor-pointer flex justify-center items-center"
          onClick={() => setCloseProfile(!openProfile)}
        >
          <span className="text-l">
            {userData?.first_name.charAt(0) || (
              <CgProfile className="text-slate-400" />
            )}
          </span>
        </div>

        {openProfile && (
          <div className="absolute shadow-sm text-sm right-0 top-[100%] bg-white/100  z-20 p-2 px-4 mt-2 rounded-md capitalize whitespace-pre">
            <NavLink to="/account">
              <div className="flex items-center gap-2 cursor-pointer border-b border-transparent  hover:border-zinc-100 py-1 ">
                <IoSettingsOutline />
                account & settings
              </div>
            </NavLink>
            <div
              className="mt-3 text-red-500 flex items-center  gap-2 cursor-pointer"
              onClick={logOutHandler}
            >
              <IoPowerSharp />
              logout
            </div>
          </div>
        )}
      </div>

      {isNotificationCartOpen && (
        <Notification
          notifications={notifications}
          onClose={notificationCartHandle}
        />
      )}
    </div>
  );
};

export default Header;
