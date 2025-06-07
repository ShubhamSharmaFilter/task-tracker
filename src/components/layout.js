import React, { useState } from "react";
import Sidebar from "./sidebar";
import { IoClose } from "react-icons/io5";
import { useUser } from "../config/userProvider";
import MobileFooter from "./mobileFooter";
import { useLocation } from "react-router-dom";
import Header from "./header";

const Layout = ({ children }) => {
  const {
    openProfile,
    setCloseProfile,
    isMenuOpen,
    setIsMenuOpen,
  } = useUser();

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const toggleButtonVisibility = () => {
    setIsButtonVisible(!isButtonVisible);
  };
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  return (
    <div
      className="layout h-screen w-full overflow-hidden "
      onClick={() => (openProfile === true ? setCloseProfile(false) : null)}
    >
      <div className="flex  h-full md:p-1">
        <div
          className={` sm:relative transition-all duration-500 ease-in-out sm:translate-x-0 z-20 pb-8 overflow-hidden ${
            isMenuOpen
              ? "absolute flex w-3/4 z-40 opacity-100 translate-x-0"
              : "absolute flex w-3/4 sm:w-auto lg:w-[15%] -translate-x-full opacity-0 sm:opacity-100 "
          }    md:flex flex-col   md:relative  gap-4 items-center  h-full px-3 pt-2  shadow-sm bg-[#4B49AC] text-white   `}
        >


          <div className="w-full flex justify-between items-center">
            <div className="flex justify-center w-full">


              <img
                className="w-auto h-16 lg:h-16 max-h-16 max-w-33 sm:block md:hidden lg:block brightness-[1000000]"
                src="/task-tracker.png"
                alt="logo"
              />
              {/* } */}
            </div>
            <div
              className="text-2xl text-white  block md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <IoClose />
            </div>
          </div>
          <Sidebar />
        </div>
        <div className="w-full  lg:w-[85%] flex flex-col overflow-hidden h-full border border-[#d8c9ae]">
          {isMenuOpen && (
            <div
              className=" block lg:hidden w-full h-full fixed backdrop-blur-[0.2rem] z-30"
              onClick={() => setIsMenuOpen(false)}
            ></div>
          )}
          <Header className="h-[5vh]" />
          <div
            className="h-[95vh] overflow-hidden "
            onClick={() => setCloseProfile(false)}
          >
            {children}
          </div>
          <MobileFooter />
        </div>
      </div>
    </div>
  );
};

export default Layout;

export const Container = ({ children, className, overflow, ...props }) => {
  return (
    <div
      className={`bg-white/100 relative rounded-2xl p-2  h-full ${className} ${
        overflow ? overflow : "overflow-hidden"
      } `}
      {...props}
    >
      {children}
    </div>
  );
};
