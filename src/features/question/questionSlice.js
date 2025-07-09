import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:null
};

const questionSlice = createSlice({
    name:'question',
    initialState,
    reducers:{}
})

export const {} = questionSlice.actions;
export default questionSlice.reducer;