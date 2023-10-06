import { configureStore } from "@reduxjs/toolkit";
const {routineReducer} = require("./redux/reducers/routineReducer");

export const store = configureStore({
    reducer : { routineReducer }
})