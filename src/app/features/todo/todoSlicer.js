import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/todoConstants";
const initialState= {
    todos: [],
    profile: {},
    accessToken: '',
    loading: false
}
export const fetchTodos = createAsyncThunk('MY_TODO/fetchTods', async(api,thunkAPI)=>{
    debugger
    const currentStateProfile = thunkAPI.getState().profile;
    let data = []
    await axios.post(BASE_URL+'get-all',{name:currentStateProfile.name,email:currentStateProfile.email}).then((result)=>{
        if(result) {
       data =  result.data.data;
        }
    }).catch((eroor)=>{console.log(eroor)});
    return data;
})
export const todoSlicer = createSlice({
    name : 'MY_TODO',
    initialState,
    reducers : {
        addTask :(state, action) =>{
            const todo =  {
                id : null,
                task : action.payload,
                profileId:state.profile.profileId,
                done: false
            }
           
            state.todos.push(todo);
        },
        removeTask : (state,action)=>{
            state.todos = state.todos.filter((task)=>task.id !=action.payload.id);
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
            state.todos = state.todos.map((task)=> {
                if(task.id === action.payload.id) {
                   task.done = true;
                }
                return task;
            });
        },
        setToken: (state,action) =>{
            state.accessToken = action.payload
        },
        setProfile: (state,action) =>{
            state.profile = action.payload
        },
        setLoading: (state,action) =>{
            state.loading = action.payload
        },
        setTodos: (state,action) =>{
            state.todos = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchTodos.fulfilled, (state,action)=>{
            debugger
            state.todos = action.payload
        }),
        builder.addCase(fetchTodos.pending, (state,action)=>{
            debugger
            state.todos = []
        })
        builder.addCase(fetchTodos.rejected, (state,action)=>{
            debugger
            state.todos = []
        })
    }
    
});

export const {addTask,updateTask,removeTask,doneTheTask,setToken,setProfile,setLoading,setTodos} = todoSlicer.actions;

export default todoSlicer.reducer;