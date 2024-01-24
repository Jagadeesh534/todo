import  todoReducer from "./features/todo/todoSlicer";

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer : todoReducer
});