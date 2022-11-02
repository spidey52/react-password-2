import { LoadingButton } from "@mui/lab";
import { Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
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
  }, [match.params.id, ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    let result = await editPass({
      username,
      email,
      password,
      _id: match.params.id,
    });
    console.log(result)
    if (result) history.push("/passes");
    else alert("Something went wrong");
  };

  return (
    <Box sx={{ maxWidth: "400px", mx: "auto", my: 3, p: 2 }} component={Paper}>
      {/* <Typography sx={{textAlign: 'center', tex}} variant="h6">Edit page is here</Typography> */}
      <Typography sx={{ textAlign: 'center', textTransform: "uppercase", mb: 2 }} variant="h6"> edit {title} details</Typography>
      {/* <h4>{title}</h4> */}
      <Stack spacing={1.5}>
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
        {/* <button className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "editing" : "submit"}
        </button> */}

        <LoadingButton loading={isLoading} onClick={submitHandler} variant="contained">
          edit password
        </LoadingButton>

      </Stack>
    </Box>
  );
};

export default Edit;
