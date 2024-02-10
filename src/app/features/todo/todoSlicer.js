import { createSlice, nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import moment from 'moment';
import customParseFormat from "dayjs/plugin/customParseFormat";
const initialState= {
    todos: [],
    profile: {},
    accessToken: '',
    loading: false,
    filteredTodos: [],
    filteredKeys: {
        completed: true,
        inCompleted: true,
        pending : true
    }
}
export const fetchTodos = createAsyncThunk('MY_TODO/fetchTods', async(api,thunkAPI)=>{
    let data = []
    data = JSON.parse(localStorage.getItem('tasks') || '[]');
    dayjs.extend(customParseFormat);
    const currentDate = dayjs(moment().format("DD-MM-YYYY hh:mm:ss a"), 'DD-MM-YYYY hh:mm:ss a"');
    data.sort((obj1, obj2) => obj1.priority - obj2.priority);
    let dataForUI = [];
    let currentState = thunkAPI.getState();
    if(currentState.filteredKeys) {
        if(currentState.filteredKeys.completed) {
            dataForUI = [...new Set([...dataForUI, ...data.filter(obj=>obj.done === true)])]
        }
        if(currentState.filteredKeys.inCompleted) {
        dataForUI =[...new Set([...dataForUI, ...data.filter(obj=>(obj.done === false && dayjs(obj.dueDate,"DD-MM-YYYY hh:mm:ss a")?.isAfter(currentDate)))])]
        }
        if(currentState.filteredKeys.pending) {
            let pendingData = [];
            pendingData = data.filter((obj)=>dayjs(obj.dueDate,"DD-MM-YYYY hh:mm:ss a")?.isBefore(currentDate) && obj.done === false);
            dataForUI = [...new Set([...dataForUI,...pendingData])];
        }
    }
    dataForUI.sort((a, b) => {
       
        return a.done - b.done;
    });
    return dataForUI;
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
                priority:action.payload.priority,
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
                   task.priority = action.payload.priority,
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
        },
        statusFilter: (state,action) =>{
            debugger
            if(action.payload.key === 'completed') {
                state.filteredKeys.completed = action.payload.value;
            }
            if(action.payload.key === 'inProgress') {
                state.filteredKeys.inCompleted = action.payload.value;
            }
            if (action.payload.key === 'pending') {
                state.filteredKeys.pending = action.payload.value;
            }

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

export const {addTask,updateTask,removeTask,doneTheTask,setLoading,setTodos,statusFilter} = todoSlicer.actions;

export default todoSlicer.reducer;