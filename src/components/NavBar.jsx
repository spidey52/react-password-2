import { AppBar, Avatar, Button, IconButton, Menu, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { LockOpenTwoTone } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import CreatePassword from "./Passes/CreatePassword";

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(state => state.user)
  return <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <LockOpenTwoTone />
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component={Button}
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.05rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        PASSMANAGER
      </Typography>
      <Box sx={{ flexGrow: 1 }} >
        <CreatePassword />
      </Box>

      {
        !isAuthenticated ? <Button color="inherit">Login</Button> : <>
          <Stack direction="row" spacing={0.25} alignItems="center">
            <Avatar alt={user.username} src={user.avatar || "https://material-ui.com/static/images/avatar/1.jpg"} sx={{ height: "30px", width: "30px" }} />
            <Button color="inherit"> {user.username} </Button>
          </Stack>
        </>
      }
    </Toolbar>
  </AppBar>;
};



export default NavBar;
