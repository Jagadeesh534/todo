import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/todo/todoSlicer";
function AddTask() {
    const [task, setTask] = useState('');
    const dispatch = useDispatch();
    const submit = () =>{
        dispatch(addTask(task))
        setTask('')
    }
  return (
    <div className="d-flex justify-content-center ">
      <div className="container m-5 w-100 d-flex  d-flex-row ">
        <div className="input-group">
          <span className="input-group-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-list-task"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"
              />
              <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
              <path
                fillRule="evenodd"
                d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"
              />
            </svg>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Add Your Task ..."
            value={task}
            onChange={(e)=>setTask(e.target.value)}
          />
        </div>
        <button className='btn btn-success m-1'  onClick={() => submit()}>Add</button>
      </div>
      
    </div>
  );
}

export default AddTask;
