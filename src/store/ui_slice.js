import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 theme: localStorage.getItem("theme") || "dark",
};

export const userSlice = createSlice({
 name: "ui",
 initialState,
 reducers: {
  setTheme: (state, action) => {
   state.theme = action.payload;
   localStorage.setItem("theme", action.payload);
  },
 },
});

export const { setTheme } = userSlice.actions;

export default userSlice.reducer;
