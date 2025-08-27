import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: null,
  role: null,
};

const logoutSlice = createSlice({
    name:'logout',
    initialState,
    reducers:{
       setCredentials: (state, action) => {
       state.token = action?.payload?.token;
       state.role = action?.payload?.role;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.role = null;
    },
    }
})

export const {setCredentials, clearCredentials} = logoutSlice.actions;
export default logoutSlice.reducer;