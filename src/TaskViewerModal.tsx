import React, { useState } from "react";
import { Task, SubTask } from "./kanbanStates";

interface TaskViewerModalProps {
  task: Task;
  editTask: (t: Task) => void;
}

export default function TaskViewerModal(props: TaskViewerModalProps) {
  const [currTask, setCurrTask] = useState<Task>(props.task);

  function toggleCheck(index: number) {
    let tempSubTasks: SubTask[] = currTask.subTasks.map((a) => a);
    tempSubTasks[index].isCompleted = !tempSubTasks[index].isCompleted;
    setCurrTask({
      title: currTask.title,
      description: currTask.description,
      subTasks: tempSubTasks,
    });
  }
  return (
    <>
      <input type="checkbox" id="taskViewerModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{props.task.title}</h3>
          <p className="py-4">{props.task.description}</p>
          <h1 className="font-bold text-lg">Subtasks</h1>
          {props.task.subTasks.map((st: SubTask, i: number) => (
            <div key={i}>
              <input
                type="checkbox"
                checked={currTask.subTasks[i].isCompleted}
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
              onClick={() => props.editTask(currTask)}
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
