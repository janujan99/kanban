import React, { useState } from "react";
import { Task, SubTask } from "./kanbanStates";

interface TaskViewerModalProps {
  task: Task;
}

export default function TaskViewerModal(props: TaskViewerModalProps) {
  const [currTask, setCurrTask] = useState<Task>(props.task);

  return (
    <>
      <input type="checkbox" id="taskViewerModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{props.task.title}</h3>
          <p className="py-4">{props.task.description}</p>
          <div className="modal-action">
            <label htmlFor="taskViewerModal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
