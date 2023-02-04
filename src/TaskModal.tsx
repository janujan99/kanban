import React, { useState } from "react";
import BoardDisplay from "./BoardDisplay";
import { BoardDisplayUnit, Task, SubTask } from "./kanbanStates";
import ModalTextInput from "./ModalTextInput";
import FormTextInput from "./FormTextInput";
interface TaskModalProps {
  saveTask: (boardIndex: number, colIndex: number, task: Task) => void;
  boardDisplayUnit: BoardDisplayUnit;
}
export default function TaskModal(props: TaskModalProps) {
  const [currTask, setCurrTask] = useState({
    title: "eg. Take coffee break",
    description:
      "e.g. It's always good to take a break. The 15 minute break will recharge the batteries a little.",
    subTasks: [
      { title: "eg. Make coffee", isCompleted: false },
      { title: "eg. Drink coffee and smile", isCompleted: false },
    ],
  });
  const [currColumnIndex, setCurrColumnIndex] = useState<number>(0);

  console.log(currTask);
  function handleTitleChange(s: string) {
    setCurrTask({
      title: s,
      description: currTask.description,
      subTasks: currTask.subTasks,
    });
  }
  function handleDescriptionChange(s: string) {
    setCurrTask({
      title: currTask.title,
      description: s,
      subTasks: currTask.subTasks,
    });
  }
  function addSubTask() {
    setCurrTask({
      title: currTask.title,
      description: currTask.description,
      subTasks: currTask.subTasks.concat({
        title: "eg. Make coffee",
        isCompleted: false,
      }),
    });
  }
  function removeSubTask(index: number) {
    let temp: SubTask[] = [];
    for (let i = 0; i < currTask.subTasks.length; i++) {
      if (i !== index) temp.push(currTask.subTasks[i]);
    }
    setCurrTask({
      title: currTask.title,
      description: currTask.description,
      subTasks: temp,
    });
  }
  function editSubTaskTitle(value: string, index: number) {
    let temp: SubTask[] = currTask.subTasks.map((i) => i);
    temp[index].title = value;
    setCurrTask({
      title: currTask.title,
      description: currTask.description,
      subTasks: temp,
    });
  }
  let subTaskRows = [];
  for (let i = 0; i < currTask.subTasks.length; i++) {
    subTaskRows.push(
      <FormTextInput
        index={i}
        placeholder={currTask.subTasks[i].title}
        value={currTask.subTasks[i].title}
        handleExitClick={removeSubTask}
        handleChange={editSubTaskTitle}
      />
    );
  }
  return (
    <div>
      {/* The button to open modal, which only displays if there are boards already there */}
      {props.boardDisplayUnit!.boards.length > 0 && (
        <label htmlFor="taskModal" className="btn">
          + New Task
        </label>
      )}
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="taskModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Task</h3>
          <ModalTextInput
            label="Title"
            placeholder={currTask.title}
            handleChange={handleTitleChange}
          />
          <ModalTextInput
            label="Description"
            placeholder={currTask.description}
            handleChange={handleDescriptionChange}
          />
          <div>
            <label className="label">
              <span className="label-text">Subtask</span>
              <span className="label-text-alt"></span>
            </label>

            {subTaskRows}
            <button className="btn" onClick={() => addSubTask()}>
              + Add New Subtask
            </button>
          </div>
          <label className="label">
            <span className="label-text">Status</span>
            <span className="label-text-alt"></span>
          </label>
          {props.boardDisplayUnit.boards.length > 0 && (
            <div className="dropdown">
              <label tabIndex={0} className="btn m-1">
                {
                  props.boardDisplayUnit!.boards[
                    props.boardDisplayUnit!.currentBoardIndex
                  ].columns[currColumnIndex].name
                }
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {props.boardDisplayUnit!.boards[
                  props.boardDisplayUnit!.currentBoardIndex
                ].columns.map((col, i) => (
                  <li onClick={() => setCurrColumnIndex(i)}>
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
              onClick={() =>
                props.saveTask(
                  props.boardDisplayUnit!.currentBoardIndex,
                  currColumnIndex,
                  currTask
                )
              }
            >
              Submit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
