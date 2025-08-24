import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const resetSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {},
});

export const {} = resetSlice.actions;
export default resetSlice.reducer;
