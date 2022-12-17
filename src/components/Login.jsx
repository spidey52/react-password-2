import { Box, Paper, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import Input from "./Helper/Input";
import { loginApi } from "./api/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/user_slice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const { isAuthenticated, login_loading: loading } = useSelector(state => state.user);

  const history = useHistory();
  const location = useLocation();

  const urlparams = new URLSearchParams(location.search);
  const redirect = urlparams.get("next") || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data, error } = await loginApi({ username, password });
    if (error) return toast.error(error);
    toast.success("Login successfull");
    dispatch(login(data))
  };

  const handleTestUser = () => {
    setPassword('testpassword')
    setUsername('testuser');
  }

  useEffect(() => {
    if(isAuthenticated) return history.push(redirect)
  }, [isAuthenticated])

  return (
    <Box sx={{ mx: 'auto', my: 4, elevation: 3, p: 2, maxWidth: "400px" }} component={Paper}>
      {/* <h2>Login</h2> */}
      <Typography variant="h5" sx={{ textTransform: "uppercase", textAlign: 'center ' }} gutterBottom>
        Login
      </Typography>
      <form onSubmit={submitHandler}>
        <Stack spacing={1}>
          <Input
            value={username}
            setValue={setUsername}
            type="text"
            placeholder="username"
            label="username"
            required={true}
          />
          {/* <Link to="/forget-password" style={{ float: "right" }}>forgot password</Link> */}
          <Input
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="password"
            label="password"
            required={true}
          />

          <LoadingButton onClick={submitHandler} variant="contained" loading={loading} >login</LoadingButton>
        </Stack>
      </form>

      <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}> Don't have an account? <Link to="/register">Signup</Link></Typography>

      {/* <Typography variant="body2" sx={{ textAlign: "center" }} gutterBottom>  or  </Typography>

      <Button fullWidth color="info" LinkComponent={Link} variant="outlined" to="/register">Register</Button> */}

      {/* Not yet register.. <Link to="/register">register</Link> */}
      {/* <div className="content">
        Not yet register.. <Link to="/register">register</Link>
      </div> */}

      {/* <div className="testuser" onClick={handleTestUser}>
        <button>
          login as test user
        </button>
      </div> */}

    </Box>
  );
};

export default Login;
