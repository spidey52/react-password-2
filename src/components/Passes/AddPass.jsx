import { LoadingButton } from "@mui/lab";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { PasswordContext } from "../../context/PasswordContext";
import Input from "../Helper/Input";

const AddPass = () => {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { addPass, isLoading } = useContext(PasswordContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await addPass({ name: title, username, email, password });
    if (result) history.push("/passes");
    else alert("Something went wrong");
  };

  return (
    <Box sx={{ p: 2, mx: "auto", my: 3, maxWidth: "400px" }} component={Paper} >
      <Typography variant="h6" sx={{ textTransform: "uppercase", textAlign: 'center', pb: 1 }}>Add New Entry</Typography>
      <Stack spacing={1}>
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
        <LoadingButton onClick={submitHandler} loading={isLoading} variant="contained">add password</LoadingButton>
      </Stack>
    </Box>
  );
};

export default AddPass;
