import { configureStore } from "@reduxjs/toolkit";
const {routineReducer} = require("./redux/reducers/routineReducer");
const {habitsReducer} = require("./redux/reducers/habitsReducer");

export const store = configureStore({
    reducer : { routineReducer, habitsReducer }
})