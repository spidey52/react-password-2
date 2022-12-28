import { createSlice } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("token"));
// const token = localStorage.getItem("token");

const initialState = {
 isAuthenticated: token ? true : false,
 user: JSON.parse(localStorage.getItem("user")) || {},
 token: token ? token : "",
 login_loading: false,
 login_error: "",
 search: "",
};

export const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
  loginLoading: (state, action) => {
   state.login_loading = action.payload;
  },
  login: (state, action) => {
   localStorage.setItem("token", JSON.stringify(action.payload.token));
   localStorage.setItem("user", JSON.stringify(action.payload.user));
   state.token = action.payload.token;
   state.user = action.payload.user;
   state.isAuthenticated = true;
  },

  logout: (state) => {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
   state.token = "";
   state.user = {};
   state.isAuthenticated = false;
  },

  setSearch: (state, action) => {
   state.search = action.payload;
  },
 },
});

export const { loginLoading, login,logout, setSearch } = userSlice.actions;

export default userSlice.reducer;
