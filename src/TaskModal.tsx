import React, { useState } from "react";
import BoardDisplay from "./BoardDisplay";
import { BoardDisplayUnit, Task, SubTask, Column, Board } from "./kanbanStates";
import ModalTextInput from "./ModalTextInput";
import FormTextInput from "./FormTextInput";
interface TaskModalProps {
  editName: (name: string) => void;
  editDescription: (description: string) => void;
  addSubTask: () => void;
  editSubTaskTitle: (val: string, i: number) => void;
  removeSubTask: (i: number) => void;
  setColumnForTask: (i: number) => void;
  addTaskToBoard: () => void;
  columnList: Column[];
  columnNumberToAddTaskTo: number;
  modalTask: Task;
}
export default function TaskModal(props: TaskModalProps) {
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

  return (
    <div>
      {/* The button to open modal, which only displays if there are boards already there */}
      {props.modalTask !== null && (
        <label htmlFor="taskModal" className="btn">
          + New Task
        </label>
      )}
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="taskModal" className="modal-toggle" />
      <div className="modal w-4/5">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Task</h3>
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
            <div className="dropdown bg-white text-black">
              <label
                tabIndex={0}
                className="btn m-1 text-black bg-white text-none !important width-52"
              >
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
              htmlFor="taskModal"
              className="btn"
              onClick={() => props.addTaskToBoard()}
            >
              Submit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
