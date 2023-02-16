import React, { useState } from "react";
import { Task, SubTask } from "./kanbanStates";

interface TaskViewerModalProps {
  task: Task;
  editTask: (t: Task) => void;
  toggleSubTask: (i: number) => void;
}

export default function TaskViewerModal(props: TaskViewerModalProps) {
  function toggleCheck(index: number) {
    props.toggleSubTask(index);
  }
  console.log("Task: ", props.task);
  return (
    <>
      <input type="checkbox" id="taskViewerModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div>
            <h3 className="font-bold text-lg">{props.task.title}</h3>

            <label htmlFor="taskModal">Edit Task</label>
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
                <h3 style={{ textDecoration: "line-through" }}>{st.title}</h3>
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
        </div>
      </div>
    </>
  );
}
