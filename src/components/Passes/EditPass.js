import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PasswordContext } from "../../context/PasswordContext";
import Input from "../Helper/Input";
const Edit = ({ match }) => {
  const style = {
    margin: "2rem auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    maxWidth: "400px",
    borderRadius: "4px",
    boxShadow: "0 0 0  0.5rem #eee",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");

  const history = useHistory();

  const { getPassById, editPass, isLoading } = useContext(PasswordContext);

  useEffect(() => {
    const data = getPassById(match.params.id) || {};
    setUsername(data.username || "");
    setPassword(data.password || "");
    setEmail(data.email || "");
    setTitle(data.name || "");
    return;
  }, [match.params.id, getPassById]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await editPass({
      username,
      email,
      password,
      _id: match.params.id,
    });
    history.push("/passes");
  };

  return (
    <div style={style}>
     

      <h2>Edit page is here</h2>
      <h4>{title}</h4>
      <form onSubmit={submitHandler}>
        <Input
          placeholder="username"
          label="username:"
          type="text"
          required={true}
          value={username}
          setValue={setUsername}
        />
        <Input
          placeholder="email"
          label="email:"
          type="email"
          required={true}
          value={email}
          setValue={setEmail}
        />
        <Input
          placeholder="password"
          label="password:"
          type="text"
          required={true}
          value={password}
          setValue={setPassword}
        />
        <button className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "editing" : "submit"}
        </button>
      </form>
    </div>
  );
};

export default Edit;
