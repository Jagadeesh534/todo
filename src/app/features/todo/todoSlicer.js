import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState= {
    todos: []
}

export const todoSlicer = createSlice({
    name : 'MY_TODO',
    initialState,
    reducers : {
        addTask :(state, action) =>{
            const todo =  {
                id : nanoid(),
                task : action.payload,
                isEdit: false,
                done: false
            }
            state.todos.push(todo);
        },
        removeTask : (state,action)=>{
            state.todos = state.todos.filter((task)=>task.id !=action.payload.id)
        },
        updateTask : (state,action)=>{
            state.todos = state.todos.map((task)=> {
                if(task.id === action.payload.id) {
                   task.task = action.payload.task;
                   task.done = false;
                }
                return task;
            });
        },
        doneTheTask : (state,action)=>{
            debugger
            state.todos = state.todos.map((task)=> {
                if(task.id === action.payload.id) {
                   task.done = true;
                }
                return task;
            });
        }


    }
});

export const {addTask,updateTask,removeTask,doneTheTask} = todoSlicer.actions;

export default todoSlicer.reducer