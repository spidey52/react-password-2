import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

const LoginRequired = ({ children}) => {
  const { isAuthenticated } = useSelector(state => state.user)

  const location = useLocation();

  if (!isAuthenticated)
    return <Redirect to={`/login?next=${location.pathname}`}> </Redirect>;
  return <>{children}</>;
};
export default LoginRequired;
