import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doneTheTask,
  removeTask,
  setLoading,
  updateTask,
  fetchTodos,
  statusFilter,
} from "../features/todo/todoSlicer";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import moment from "moment";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ContentEditable from "react-contenteditable";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import deleteSound from "../../../public/delete.mp3";
import completeSound from "../../../public/congrats.mp3";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

function ListTasksV2() {
  dayjs.extend(customParseFormat);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const todos = useSelector((state) => state.todos);
  // const [todos,setTodos] = useState([]);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const priorities = [
    { id: 1, name: "High" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Low" },
  ];
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(
    dayjs(moment().format("DD-MM-YYYY hh:mm:ss a"), "DD-MM-YYYY hh:mm:ss a")
  );
  const [priorityLabel, setPriorityLabel] = useState("Priority");
  const [priority, setPriority] = useState("P1");
  const [updatingData, setUpdatingData] = useState({});
  const [currentDate, setCurrentDate] = useState(
    dayjs(moment().format("DD-MM-YYYY hh:mm:ss a"), 'DD-MM-YYYY hh:mm:ss a"')
  );
  const onContentChange = useCallback((evt) => {
    setTask(evt.target.value);
  }, []);
  const handlePriorityLabel = (event) => {
    setPriorityLabel(event.name);
    setPriority(event.id);
  };
  useEffect(() => {
    dispatch(fetchTodos());
   
  }, []);
  const onEdit = (todo) => {
    let data = {
      ...todo,
      isEdit: true,
      priority: todo.hasOwnProperty("priority") ? todo.priority : 3,
      dueDate: dayjs(todo.dueDate, "DD-MM-YYYY hh:mm:ss a"),
    };
    setUpdatingData(data);
    setTask(data.task);
    const selectedPriority = priorities.find((p) => p.id === data.priority);
    setPriority(data.priority);
    setPriorityLabel(selectedPriority.name);
  };
  const onSaveTask = () => {
    const formattedDueDate = dueDate.format("DD-MM-YYYY hh:mm:ss a");

    const taskObj = {
      id: updatingData.id,
      task: task,
      done: false,
      created: updatingData.created,
      updated: updatingData.updated,
      dueDate: formattedDueDate,
      priority: priority,
    };
    dispatch(updateTask(taskObj));
    setUpdatingData({});
    dispatch(fetchTodos());
    resetAll();
  };

  const resetAll = () => {
    setTask("");
    setPriority("");
    setPriorityLabel("Priority");
    setDueDate(
      dayjs(moment().format("DD-MM-YYYY hh:mm:ss a"), "DD-MM-YYYY hh:mm:ss a")
    );
    setUpdatingData({});
  };
  const onDelete = (todo) => {
    const audio = new Audio(deleteSound);
    audio.play();
    setTimeout(() => {
      dispatch(removeTask(todo));
    }, 800);
  };
  const onComplete = (todo) => {
    setShowConfetti(true);
    let data = {
      ...todo,
      done: true,
    };
    dispatch(setLoading(true));
    dispatch(doneTheTask(data));
    const audio = new Audio(completeSound);
    audio.play();
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    dispatch(fetchTodos())
  };
  const [completed, setCompleted] = useState(true);
  const [inCompleted, setInCompleted] = useState(true);
  const [pending, setPending] = useState(true);
  const handleInpSwitch = (event) => {
    setInCompleted(event.target.checked);
    dispatch(statusFilter({key:'inProgress', value:event.target.checked}));
    dispatch(fetchTodos())
  };
  const handleCmpltedSwitch = (event) => {
    setCompleted(event.target.checked);
    dispatch(statusFilter({key:'completed', value:event.target.checked}));
    dispatch(fetchTodos())
  };
  const handlePendingSwitch = (event) => {
    setPending(event.target.checked);
    dispatch(statusFilter({key:'pending', value:event.target.checked}));
    dispatch(fetchTodos());
  };
  return (
    <>
      {todos?.length != 0 &&  <div className="d-flex justify-content-end">
        <IconButton
          aria-label="delete"
          aria-describedby={id}
          onClick={handleClick}
        >
          <TuneRoundedIcon />
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="d-flex flex-column m-3 gap-2">
          <FormControlLabel
            control={
              <Switch
                checked={inCompleted}
                onChange={(event) => {
                  handleInpSwitch(event);
                }}
                name="inProgress"
              />
            }
            label="In Progress"
          />
          <FormControlLabel
            control={
              <Switch
                checked={completed}
                onChange={(event) => {
                  handleCmpltedSwitch(event);
                }}
                name="completed"
              />
            }
            label="Completed"
          />
          <FormControlLabel
            control={
              <Switch
                checked={pending}
                onChange={(event) => {
                  handlePendingSwitch(event);
                }}
                name="pending"
              />
            }
            label="Pending"
          />
          </div>
        </Popover>
      </div>}
      <div className="d-flex justify-content-start mt-3">
        {showConfetti && <Confetti width={width} height={height} />}
        <ul className="list-group w-100">
          {todos?.length === 0 && (
            <h5
              style={{ fontSize: "small" }}
              className="text-center text-dark-50 "
            >
              No tasks...
            </h5>
          )}
          {todos?.map((obj) => {
            return (
              <li
                className={`list-group-item " ${
                  updatingData?.isEdit && updatingData.id === obj.id
                    ? " list-item-edit"
                    : ""
                }`}
                key={obj.id}
              >
                {updatingData?.isEdit && updatingData.id === obj.id && (
                  <>
                    <div className="wrapper warapper-in-edit">
                      <div className="input-box">
                        <div className="task-area p-3">
                          <span
                            className={`placeholder ${
                              obj.task === "" ? "" : " d-none"
                            }`}
                          >
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
                                {priorities.map((p) => (
                                  <>
                                    <li key={p.id}>
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
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="actions">
                            <MobileDateTimePicker
                              label="Due Date"
                              value={updatingData.dueDate}
                              onChange={(newTime) => setDueDate(newTime)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bottom">
                        <div className="content">
                          <button
                            className="btn btn-outline-secondary m-1 btn-color"
                            disabled={task === ""}
                            onClick={() => {
                              setUpdatingData({ obj });
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-success m-1 btn-clr"
                            onClick={onSaveTask}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {updatingData.id !== obj.id && (
                  <>
                    <div className=" d-flex justify-content-between ">
                      <div
                        className={`m-0 text-bolder text-dark ${
                          obj.done ? "text-decoration-line-through" : ""
                        }`}
                      >
                        <span className="mr-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className={`bi bi-flag-fill ${
                              obj.priority === 1 ? " text-danger" : ""
                            }  ${obj.priority === 2 ? " text-warning" : ""}  ${
                              obj.priority === 3 ? " text-info" : ""
                            }`}
                            viewBox="0 0 16 16"
                          >
                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                          </svg>
                        </span>{" "}
                        {obj.task?.replace(/&nbsp;/g, " ")}
                      </div>
                      <div className="d-flex justify-content-center gap-3">
                        <svg
                          onClick={() => {
                            onEdit(obj);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          className="bi bi-pencil-square cursor-pointer-blue"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                        {!obj.done && (
                          <svg
                            onClick={() => {
                              onComplete(obj);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="bi bi-check-circle cursor-pointer-green"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                          </svg>
                        )}

                        <svg
                          onClick={() => {
                            onDelete(obj);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          className="bi bi-trash cursor-pointer-red"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
                {updatingData.id !== obj.id && (
                  <div className="text-center d-flex justify-content-between align-items-center p-1">
                    <p className="audit-text">
                      {" "}
                      Created: {obj?.created}{" "}
                      {obj?.updated && "| Updated:" + obj?.updated}{" "}
                      {obj?.doneAt && "| Done:" + obj?.doneAt}{" "}
                      {obj?.dueDate && (
                        <span
                          className={`${
                            dayjs(
                              obj.dueDate,
                              "DD-MM-YYYY hh:mm:ss a"
                            )?.isBefore(currentDate) && obj.done === false
                              ? "blink-text"
                              : ""
                          }`}
                        >
                          {" "}
                          | Due Date: {obj?.dueDate}
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ListTasksV2;
