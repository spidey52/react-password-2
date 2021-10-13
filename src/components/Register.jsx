import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Input from "./Helper/Input";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { register, loading, error, isAuthenticated } = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  const urlparams = new URLSearchParams(location.search);
  const redirect = urlparams.get("next") || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    await register({ username, password, email, firstName, lastName });
  };

  useEffect(() => {
    if (isAuthenticated) return history.push(redirect);
  });

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <br />
      <h2>Login</h2>

      <div>
        {error && error}
      </div>

      <form onSubmit={submitHandler}>

        <Input
          type="text"
          value={firstName}
          setValue={setFirstName}
          placeholder="first name"
          label="first name"
          required={true}
        />

        <Input
          type="text"
          value={lastName}
          setValue={setLastName}
          placeholder="last name"
          label="last name"
          required={true}
        />



        <Input
          value={username}
          setValue={setUsername}
          type="text"
          placeholder="username"
          label="username"
          required={true}
        />

        <Input
          type="text"
          value={email}
          setValue={setEmail}
          placeholder="email"
          label="email"
          required={true}
        />

        <Input
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="password"
          label="password"
          required={true}
        />

        <button className="btn btn-primary">
          {loading ? "signing up" : "register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
