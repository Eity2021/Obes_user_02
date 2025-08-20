import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null
};

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {}
})

export const {} = emailSlice.actions;
export default emailSlice.reducer;