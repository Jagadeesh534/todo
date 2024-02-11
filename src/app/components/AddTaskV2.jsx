import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import moment from "moment";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useCallback, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useDispatch } from "react-redux";
import { addTask, fetchTodos } from "../features/todo/todoSlicer";

function AddTaskV2() {
  dayjs.extend(customParseFormat);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(
    dayjs(moment().format("DD-MM-YYYY hh:mm:ss a"), "DD-MM-YYYY hh:mm:ss a")
  );
  const [priorityLabel, setPriorityLabel] = useState("High");
  const [priority, setPriority] = useState(1);
  const [showInput, setShowInput] = useState(false);
  const priorities = [
    { id: 1, name: "High", class: "text-danger" },
    { id: 2, name: "Medium", class: "text-warning" },
    { id: 3, name: "Low", class: "text-info" },
  ];
  const dispatch = useDispatch();
  const onContentChange = useCallback((evt) => {
    setTask(evt.target.value);
  }, []);
  const handlePriorityLabel = (value) => {
    setPriorityLabel(value.name);
    setPriority(value.id);
  };
  const onSaveTask = () => {
    const formattedDueDate = dueDate.format("DD-MM-YYYY hh:mm:ss a");

    const obj = {
      task: task,
      dueDate: formattedDueDate,
      priority: priority,
    };
    dispatch(addTask(obj));
    dispatch(fetchTodos());
    resetAll();
  };

  const resetAll = () => {
    setTask("");
    setPriority(1);
    setPriorityLabel("Priority 1");
    setDueDate(
      dayjs(moment().format("DD-MM-YYYY hh:mm:ss a"), "DD-MM-YYYY hh:mm:ss a")
    );
    setShowInput(false);
  };
  function getPriorityAddOnCls() {
    const p = priorities.find((obj) => obj.name === priorityLabel);
    return p.class;
  }
  return (
    <>
      <div className="d-flex justify-content-start ">
        <button
          type="button"
          disabled={showInput}
          onClick={() => {
            setShowInput(true);
            setPriorityLabel("High");
          }}
          className="btn btn-link p-2 add-btn d-flex gap-1 text-decoration-none "
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
          </span>
          <span>Click to add a task</span>
        </button>
      </div>
      {showInput && (
        <>
          <div className="wrapper">
            <div className="input-box">
              <div className="task-area">
                <span className={`placeholder ${task === "" ? "" : " d-none"}`}>
                  Enter your task
                </span>
                <ContentEditable
                  onChange={onContentChange}
                  className="input editable"
                  html={task}
                />
              </div>
              <div className="d-flex justify-content-between">
                <div className="actions">
                  <div className="dropdown">
                    <a
                      className="btn btn-outline-secondary dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="m-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  fill="currentColor"
                                  className={`bi bi-flag-fill ${getPriorityAddOnCls()}`}
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                                </svg>
                              </span> {priorityLabel}
                    </a>

                    <ul className="dropdown-menu">
                      {priorities.map((p) => (
                        <>
                          <li key={p.id}>
                            <a
                              className="dropdown-item"
                              onClick={() => {
                                handlePriorityLabel(p);
                              }}
                            >
                              <span className="m-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                 
                                  className={`bi bi-flag-fill ${p.class}`}
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                                </svg>
                              </span>
                              {p.name}
                            </a>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="actions">
                  <MobileDateTimePicker
                    label="Due Date"
                    value={dueDate}
                    onChange={(newTime) => setDueDate(newTime)}
                  />
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="content">
                <button
                  className="btn btn-outline-secondary m-1"
                  onClick={() => {
                    setShowInput(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success m-1 btn-clr"
                  disabled={task === ""}
                  onClick={onSaveTask}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddTaskV2;
