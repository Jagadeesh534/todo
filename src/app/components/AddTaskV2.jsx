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
  const [priorityLabel, setPriorityLabel] = useState("Priority");
  const [priority, setPriority] = useState(1);
  const [showInput, setShowInput] = useState(false);
  const priorities = [
    { id: 1, name: 'High' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Low' }
  ];
  const dispatch = useDispatch();
  const onContentChange = useCallback((evt) => {
    setTask(evt.target.value);
  }, []);
  const handlePriorityLabel = (value) => {
    setPriorityLabel(value.name)
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
    dispatch(fetchTodos())
    resetAll();
  };

  const resetAll = () => {
    setTask("");
    setPriority(1);
    setPriorityLabel('Priority 1');
    setDueDate(
      dayjs(moment().format("DD-MM-YYYY hh:mm:ss a"), "DD-MM-YYYY hh:mm:ss a")
    );
    setShowInput(false);
  };

  return (
    <>
      <div className="d-flex justify-content-start ">
        <button
          type="button"
          disabled={showInput}
          onClick={() => {setShowInput(true);setPriorityLabel('High');}}
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
                      {priorityLabel}
                    </a>

                    <ul className="dropdown-menu">
                      {priorities.map((p) =>  (
                          <>
                            <li  key={p.id}>
                              <a
                             
                                className="dropdown-item"
                                onClick={() => {
                                  handlePriorityLabel(p);
                                }}
                              >
                                {p.name}
                              </a>
                            </li>
                          </>
                        )
                      )}
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
