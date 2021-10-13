import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Input from "./Helper/Input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, isAuthenticated } = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  const urlparams = new URLSearchParams(location.search);
  const redirect = urlparams.get("next") || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    await login({ username, password });
  };

  useEffect(() => {
    if (isAuthenticated) return history.push(redirect);
  });

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <br />
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <Input
          value={username}
          setValue={setUsername}
          type="text"
          placeholder="username"
          label="username"
          required={true}
        />
        <Link to="/forget-password" style={{ float: "right" }}>forgot password</Link>
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="password"
          label="password"
          required={true}
        />

        <button className="btn btn-primary">
          {loading ? "logging" : "login"}
        </button>
      </form>

      <div className="content">
        Not yet register.. <Link to="/register">register</Link>
      </div>

    </div>
  );
};

export default Login;
