import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const answerSlice = createSlice({
    name: 'answer',
    initialState,
    reducers: {}
})

export const { } = answerSlice.actions;
export default answerSlice.reducer;