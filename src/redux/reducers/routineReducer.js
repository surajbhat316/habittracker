import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = { routine: ["Abc"] };



const routineSlice = createSlice({
    name: "routine",
    initialState: INITIAL_STATE,
    reducers: []
})


export const routineReducer = routineSlice.reducer;


export const routineSelector = (state) => state.routineReducer;