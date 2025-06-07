import React, { use, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "./validateToken.js";
import { getCookie } from "./webStorage.js";
import { useUser } from "./userProvider.js";
import { LogoLoader } from "../components/loader.js";

const ProtectedRoute = ({ children, resource, actions }) => {
  const { setUser, userData, permissions } = useUser();
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("protected route permissions", children, resource, actions);

  useEffect(() => {
    const token = getCookie("tttoken");
    if (!token) {
      window.location.href = "/";
      return;
    }

    validateToken(token)
      .then((user) => {
        if (user?.success) {
          setUser(user.user);
          setIsValidated(true);

          console.log("sssssssssss", user);
        } else {
          setIsValidated(false);
        }
      })
      .catch((error) => {
        console.error("Token validation failed:", error);
        setIsValidated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LogoLoader maintext="Verifying.." />;
  }

  if (!isValidated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
