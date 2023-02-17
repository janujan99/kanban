import React, { useState } from "react";
import { Task, SubTask } from "./kanbanStates";

interface TaskViewerModalProps {
  mode: "view" | "edit" | "delete";
  task: Task;
  toggleSubTask: (i: number) => void;
  setTaskModalMode: (mode: "view" | "edit" | "delete") => void;
  deleteTaskFromModal: () => void;
}

export default function TaskViewerModal(props: TaskViewerModalProps) {
  function toggleCheck(index: number) {
    props.toggleSubTask(index);
  }
  //console.log("Task: ", props.task);
  console.log("Mode: ", props.mode);
  return (
    <>
      <input type="checkbox" id="taskViewerModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          {props.mode == "view" && (
            <>
              <div>
                <h3 className="font-bold text-lg">{props.task.title}</h3>
                <div className="dropdown">
                  <label tabIndex={0} className="btn m-1">
                    Click
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Edit Task</a>
                    </li>
                    <li onClick={() => props.setTaskModalMode("delete")}>
                      <a>Delete Task</a>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="py-4">{props.task.description}</p>
              <h1 className="font-bold text-lg">Subtasks</h1>
              {props.task.subTasks.map((st: SubTask, i: number) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    checked={props.task.subTasks[i].isCompleted}
                    onChange={() => toggleCheck(i)}
                  />
                  {!st.isCompleted && <h3>{st.title}</h3>}
                  {st.isCompleted && (
                    <h3 style={{ textDecoration: "line-through" }}>
                      {st.title}
                    </h3>
                  )}
                </div>
              ))}
              <div className="modal-action">
                <label
                  htmlFor="taskViewerModal"
                  className="btn"
                  onClick={() => console.log("Hi")}
                >
                  Save Changes
                </label>
                <label htmlFor="taskViewerModal" className="btn">
                  Close
                </label>
              </div>
            </>
          )}
          {props.mode == "delete" && (
            <>
              <h1>Are you sure you want to delete this task?</h1>
              <label
                htmlFor="taskViewerModal"
                className="btn"
                onClick={() => props.deleteTaskFromModal()}
              >
                Yes
              </label>
              <label htmlFor="taskViewerModal" className="btn">
                No
              </label>
            </>
          )}
        </div>
      </div>
    </>
  );
}
