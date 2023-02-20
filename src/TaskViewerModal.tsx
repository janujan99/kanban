import React, { useState } from "react";
import { Task, SubTask, Column } from "./kanbanStates";
import FormTextInput from "./FormTextInput";
import ModalTextInput from "./ModalTextInput";

interface TaskViewerModalProps {
  mode: "view" | "edit" | "delete";
  task: Task;
  toggleSubTask: (i: number) => void;
  setTaskModalMode: (mode: "view" | "edit" | "delete") => void;
  deleteTaskFromModal: () => void;
  editName: (name: string) => void;
  editDescription: (description: string) => void;
  addSubTask: () => void;
  editSubTaskTitle: (val: string, i: number) => void;
  removeSubTask: (i: number) => void;
  setColumnForTask: (i: number) => void;
  editTaskOnBoard: () => void;
  columnList: Column[];
  columnNumberToAddTaskTo: number;
  modalTask: Task;
}

export default function TaskViewerModal(props: TaskViewerModalProps) {
  function setCurrColumn(index: number) {
    props.setColumnForTask(index);
  }
  function handleTitleChange(s: string) {
    props.editName(s);
  }
  function handleDescriptionChange(s: string) {
    props.editDescription(s);
  }
  function addSubTask() {
    props.addSubTask();
  }
  function removeSubTask(index: number) {
    props.removeSubTask(index);
  }
  function editSubTaskTitle(value: string, index: number) {
    props.editSubTaskTitle(value, index);
  }
  function toggleCheck(index: number) {
    props.toggleSubTask(index);
  }
  //console.log("Task: ", props.task);
  console.log("Mode: ", props.mode);
  return (
    <>
      <input type="checkbox" id="taskViewerModal" className="modal-toggle" />
      <div className="modal w-4/5">
        <div className="modal-box">
          {props.mode === "view" && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <h3
                  className="font-bold text-lg"
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {props.task.title}
                </h3>
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="btn m-1 bg-white text-black border-none rotate-90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li onClick={() => props.setTaskModalMode("edit")}>
                      <a>Edit Task</a>
                    </li>
                    <li onClick={() => props.setTaskModalMode("delete")}>
                      <a>Delete Task</a>
                    </li>
                  </ul>
                </div>
              </div>
              <p
                className="py-4"
                style={{ color: "grey", fontWeight: "bold", fontSize: 13 }}
              >
                {props.task.description}
              </p>
              <h1 className="font-bold text-lg text-left">Subtasks</h1>
              {props.task.subTasks.map((st: SubTask, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={props.task.subTasks[i].isCompleted}
                    onChange={() => toggleCheck(i)}
                    style={{}}
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
                <label htmlFor="taskViewerModal" className="btn">
                  Save Changes
                </label>
              </div>
            </>
          )}
          {props.mode === "delete" && (
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
          {props.mode === "edit" && (
            <>
              <h3 className="font-bold text-lg">Edit Task</h3>
              <ModalTextInput
                label="Title"
                placeholder={props.modalTask.title}
                handleChange={handleTitleChange}
              />
              <ModalTextInput
                label="Description"
                placeholder={props.modalTask.description}
                handleChange={handleDescriptionChange}
              />
              <div>
                <label className="label">
                  <span className="label-text">Subtask</span>
                  <span className="label-text-alt"></span>
                </label>

                {props.modalTask.subTasks.map((col, i) => (
                  <FormTextInput
                    index={i}
                    placeholder={props.modalTask.subTasks[i].title}
                    value={props.modalTask.subTasks[i].title}
                    handleExitClick={removeSubTask}
                    handleChange={editSubTaskTitle}
                  />
                ))}
                <button className="btn" onClick={() => addSubTask()}>
                  + Add New Subtask
                </button>
              </div>
              <label className="label">
                <span className="label-text">Status</span>
                <span className="label-text-alt"></span>
              </label>
              {props.modalTask !== null && (
                <div className="dropdown">
                  <label tabIndex={0} className="btn m-1">
                    {props.columnList[props.columnNumberToAddTaskTo].name}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {props.columnList.map((col, i) => (
                      <li onClick={() => setCurrColumn(i)}>
                        <a>{col.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="modal-action">
                <label
                  htmlFor="taskViewerModal"
                  className="btn"
                  onClick={() => props.editTaskOnBoard()}
                >
                  Submit
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
