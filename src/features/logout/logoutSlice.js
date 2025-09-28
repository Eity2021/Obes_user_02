import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  role: null,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
});

export const {} = logoutSlice.actions;
export default logoutSlice.reducer;
