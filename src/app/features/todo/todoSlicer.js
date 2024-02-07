import { createSlice, nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import moment from 'moment';
const initialState= {
    todos: [],
    profile: {},
    accessToken: '',
    loading: false
}
export const fetchTodos = createAsyncThunk('MY_TODO/fetchTods', async(api,thunkAPI)=>{
    let data = []
    data = JSON.parse(localStorage.getItem('tasks') || '[]');
    return data;
})
export const todoSlicer = createSlice({
    name : 'MY_TODO',
    initialState,
    reducers : {
        addTask :(state, action) =>{
            const todo =  {
                id : nanoid(),
                task : action.payload.task,
                done: false,
                isEdit : false,
                created: moment().format("DD-MM-YYYY hh:mm:ss a"),
                updated: null,
                doneAt: null,
                dueDate: action.payload.dueDate
            }
           
            state.todos.push(todo);
            localStorage.setItem('tasks' ,  JSON.stringify(state.todos));
        },
        removeTask : (state,action)=>{
            state.todos = state.todos.filter((task)=>task.id !=action.payload.id);
            localStorage.setItem('tasks' , JSON.stringify(state.todos));
        },
        updateTask : (state,action)=>{
            
            state.todos = state.todos.map((task)=> {
                if(task.id === action.payload.id) {
                   task.task = action.payload.task;
                   task.done = false;
                   task.updated = moment().format("DD-MM-YYYY hh:mm:ss a")
                   task.doneAt = null,
                   task.dueDate = action.payload.dueDate
                }
                return task;
            });
            localStorage.setItem('tasks' , JSON.stringify(state.todos));
        },
        doneTheTask : (state,action)=>{
            state.todos = state.todos.map((task)=> {
                if(task.id === action.payload.id) {
                   task.done = true;
                   task.doneAt = moment().format("DD-MM-YYYY hh:mm:ss a")
                }
                return task;
            });
            localStorage.setItem('tasks' , JSON.stringify(state.todos));
        },
        setLoading: (state,action) =>{
            state.loading = action.payload
        }
    } ,extraReducers: (builder)=>{
        builder.addCase(fetchTodos.fulfilled, (state,action)=>{
            state.todos = action.payload;
        }),
        builder.addCase(fetchTodos.pending, (state,action)=>{
            state.todos = []
        })
        builder.addCase(fetchTodos.rejected, (state,action)=>{
            state.todos = []
        })
    }
    
});

export const {addTask,updateTask,removeTask,doneTheTask,setLoading,setTodos} = todoSlicer.actions;

export default todoSlicer.reducer;