import React, { useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginRequired = ({ children}) => {
  const { isAuthenticated } = useContext(UserContext);

  const location = useLocation();

  if (!isAuthenticated)
    return <Redirect to={`/login?next=${location.pathname}`}> </Redirect>;
  return <>{children}</>;
};
export default LoginRequired;
