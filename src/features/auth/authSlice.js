import { createSlice } from "@reduxjs/toolkit";

const auth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const initialState = {
  token: auth?.accessToken,
  role: auth?.role,
};
// const initialState = {
//   accessToken: auth?.accessToken,
//   user: auth?.user,
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action?.payload?.accessToken;
       state.role = action?.payload?.role;
    },


    // userLoggedOut: (state) => {
    //   state.accessToken = null;
    //   // state.user = undefined;
    // },
  },
});

export const { userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;