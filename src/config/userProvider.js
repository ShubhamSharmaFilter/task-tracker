import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "./webStorage.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [storeData, setStoreData] = useState("");
  const [openProfile, setCloseProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPersonalize, setIsPersonalize] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [currentModule, setCurrentModule] = useState("sales");

  const token = getCookie("tttoken");

  const setUser = (user) => {
    setUserData(user);

    console.log("✅ Setting User:", user);
  };

  const [showInternetStatus, setShowInternetStatus] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      setShowInternetStatus(true);
    } else {
      setTimeout(() => {
        setShowInternetStatus(false);
      }, 10000);
    }
  }, [navigator.onLine]);

  return (
    <UserContext.Provider
      value={{
        token,
        userData,
        setUser,
        storeData,
        setStoreData,
        openProfile,
        setCloseProfile,
        isMenuOpen,
        setIsMenuOpen,
        permissions,
        setPermissions,
        showInternetStatus,
        isPersonalize,
        setIsPersonalize,
        showSearch,
        setShowSearch,
        permissions,
        currentModule,
        setCurrentModule,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
