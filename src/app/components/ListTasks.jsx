import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doneTheTask, removeTask, updateTask } from "../features/todo/todoSlicer";

function ListTasks() {
  const todos = useSelector((state) => state.todos);
  const [updatingData, setUpdatingData] = useState({});
  const dispatch = useDispatch();
  const onDelete = (todo) => {
    dispatch(removeTask(todo));
  };

  const onEdit = (todo) => {
    let data = {
      ...todo,
      isEdit: true,
    };
    setUpdatingData(data);
  };
  const handleUpdatingData = (value) => {
    setUpdatingData({
      ...updatingData,
      task: value,
    });
  };
  const saveEditedData = () => {
    dispatch(updateTask(updatingData));
    setUpdatingData({});
  };
  const completeTask = (todo)=>{
    dispatch(doneTheTask(todo))
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="container w-100 d-flexx">
        {todos.length === 0 && (
          <h2 className="text-center text-danger ">No Tasks Available</h2>
        )}
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={` p-2 text-center d-flex justify-content-between align-items-center ${
              todo.done ? "bg-success" : "bg-info"
            } }`}
          >
            {updatingData?.isEdit && updatingData.id === todo.id ? (
              <input
                type="text"
                className="form-control w-75"
                placeholder="Edit Your Task ..."
                value={updatingData.task}
                onChange={(e) => handleUpdatingData(e.target.value)}
              />
            ) : (
              <p className={`m-0 text-bolder text-white ${todo.done ? 'text-decoration-line-through' : ''}`}> {todo.task}</p>
            )}

           

            
              <div className="d-flex gap-2">
               

                {!updatingData.isEdit ? (
                  
                  <><span onClick={() => onEdit(todo)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      style={{ cursor: "pointer" }}
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                  </span><span onClick={() => onDelete(todo)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        style={{ cursor: "pointer" }}
                        className="bi bi-trash-fill text-danger"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg>
                    </span>
                    <span onClick={()=>completeTask(todo)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-check2-circle"
                    style={{cursor:'pointer'}}
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                  </svg>
                </span>
                    </>
                ) : (
                  <span onClick={() => saveEditedData()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      style={{ cursor: "pointer" }}
                      fill="currentColor"
                      className="bi bi-save"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
                    </svg>
                  </span>
                )}
               
              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListTasks;
