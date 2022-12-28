import { AppBar, Avatar, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Brightness4, Brightness7, LockOpenTwoTone } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CreatePassword from "./Passes/CreatePassword";
import { setTheme } from "../store/ui_slice";
import { Link } from "react-router-dom";
import { logout } from "../store/user_slice";

const NavBar = () => {
  const { theme } = useSelector(state => state.ui)
  const dispatch = useDispatch()

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


      <Stack spacing={1} direction="row">
        <IconButton
          color="inherit"
          onClick={() =>
            dispatch(setTheme(theme === "light" ? "dark" : "light"))
          }
        >
          {theme === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>

        {
          !isAuthenticated ? <Button color="inherit">Login</Button> : <>
            <Stack direction="row" spacing={0.25} alignItems="center">
              <Avatar alt={user.username} src={user.avatar || "https://material-ui.com/static/images/avatar/1.jpg"} sx={{ height: "30px", width: "30px" }} />
              {/* <Button color="inherit"> {user.username} </Button> */}
              <UserName />
            </Stack>
          </>
        }
      </Stack>
    </Toolbar>
  </AppBar>;
};


const UserName = () => {
  const { isAuthenticated, user } = useSelector(state => state.user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  }

  const handleLogout = () => {
    dispatch(logout())
    handleClose()
  }

  return <>
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      color="inherit"
      onClick={handleClick}
    >
      {user.username}
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  </>

}

export default NavBar;
