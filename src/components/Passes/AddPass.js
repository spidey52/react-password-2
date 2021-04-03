import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { PasswordContext } from "../../context/PasswordContext";
import Input from "../Helper/Input";

const AddPass = () => {
  const style = {
    margin: "2rem auto",
    padding: "1rem",
    maxWidth: "400px",
    borderRadius: "4px",
    boxShadow: "0 0 0  0.5rem #eee",
  };

  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { addPass, isLoading } = useContext(PasswordContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    await addPass({ name: title, username, email, password });
    history.push("/passes");
  };

  return (
    <div style={style}>
      <form onSubmit={submitHandler}>
        <Input
          value={title}
          setValue={setTitle}
          type="text"
          placeholder="name"
          label="title"
          required={true}
        />
        <Input
          type="text"
          placeholder="username"
          label="username"
          required={true}
          value={username}
          setValue={setUsername}
        />
        <Input
          type="email"
          placeholder="Enter email"
          label="email"
          value={email}
          setValue={setEmail}
        />
        <Input
          type="password"
          placeholder="password"
          required={true}
          label="password"
          value={password}
          setValue={setPassword}
        />
        {/* <Input type="submit" className="btn btn-primary" /> */}
        <button className="btn btn-primary">
          {isLoading ? "adding" : "submit"}
        </button>
      </form>
    </div>
  );
};

export default AddPass;
