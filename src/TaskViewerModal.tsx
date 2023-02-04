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
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
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
