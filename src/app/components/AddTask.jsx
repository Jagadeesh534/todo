import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addTask, fetchTodos, setLoading } from "../features/todo/todoSlicer";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import moment from 'moment';
import customParseFormat from 'dayjs/plugin/customParseFormat'
 function AddTask() {
  dayjs.extend(customParseFormat)
  const [task, setTask] = useState('');
  const dispatch = useDispatch();
  const [dueDate,setDueDate] = useState(dayjs(moment().format("DD-MM-YYYY hh:mm:ss a"), 'DD-MM-YYYY hh:mm:ss a'));
  const [isBtnDisable, setIsBtnDisable] = useState(true)
  const isLoading  = useSelector((state)=>state.loading);
  
  const submit = () => {
    const formattedDueDate = dueDate.format('DD-MM-YYYY hh:mm:ss a');
    dispatch(setLoading(true))
    const obj = {
      task: task,
      dueDate: formattedDueDate
    }
    dispatch(addTask(obj))
    dispatch(setLoading(false))
    setTask("");
    dispatch(fetchTodos())
  };
  
  useEffect(()=>{
    if((dueDate!=undefined && dueDate!=null) && (task!='' && task!=undefined) ) {
      setIsBtnDisable(false);
     } else {
       setIsBtnDisable(true);
     }
  },[task,dueDate])
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
          <div className="add-button">

          <MobileDateTimePicker label='Due Date' value={dueDate} onChange={(newTime) => setDueDate(newTime)}/>
          </div>
          <button className="btn btn-success add-button" disabled={isBtnDisable} onClick={() => submit()}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTask;
