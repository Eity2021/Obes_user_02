import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  role: null,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    // setCredentials: (state, action) => {
    //   state.token = action?.payload?.token;
    //   state.role = action?.payload?.role;
    // },
  },
});

export const {} = logoutSlice.actions;
export default logoutSlice.reducer;
