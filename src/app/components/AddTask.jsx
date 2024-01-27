import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setLoading,fetchTodos } from "../features/todo/todoSlicer";
import { BASE_URL } from "../constants/todoConstants";
import axios from "axios";
import { ClipLoader } from "react-spinners";

 function AddTask() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state)=>state.profile);

  const isLoading  = useSelector((state)=>state.loading);
 
  const submit = () => {
    dispatch(setLoading(true))
    const taskObj = {
      id : null,
      task: task,
      done: false,
      profileId: userData.profileId
    }
    axios.post(BASE_URL+'save-task',taskObj).then(async (response)=>{
      if(response.data.message === 'success') {
        dispatch(setLoading(false));

    dispatch(fetchTodos())
      }
    }).catch((eroor)=>{console.log(eroor)
      dispatch(setLoading(false))})
    setTask("");
  };
 
  return (
    <>
    

      <div className={`d-flex justify-content-center ${isLoading ? '' : ''}`}>
      
        <div className="container mt-3 mb-3 w-100 d-flex  d-flex-row ">
          
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
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <button className="btn btn-success m-1" onClick={() => submit()}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTask;
