import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./createSlice"

export const store = configureStore({
    reducer:{
        todo:todoReducer
    },
});