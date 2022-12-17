import { createSlice } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("token"));
const initialState = {
 isAuthenticated: token ? true : false,
 user: JSON.parse(localStorage.getItem("user")) || {},
 token: token ? token : "",
 login_loading: false,
 login_error: "",
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
  },
 },
});

export const { loginLoading, login } = userSlice.actions;

export default userSlice.reducer;
