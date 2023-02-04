import React, { useState } from "react";
import { Task, SubTask } from "./kanbanStates";

interface TaskDisplayUnitProps {
  task: Task;
  setCurrentTask: () => void;
}

export default function TaskDisplayUnit(props: TaskDisplayUnitProps) {
  let numSubTasksCompleted: number = props.task.subTasks.filter(
    (x: SubTask) => x.isCompleted
  ).length;
  let totalSubTasks: number = props.task.subTasks.length;
  return (
    <label htmlFor="taskViewerModal" onClick={props.setCurrentTask}>
      <div className="taskDisplayUnit">
        <h1>{props.task.title}</h1>
        <h3>
          {numSubTasksCompleted} of {totalSubTasks} completed
        </h3>
      </div>
    </label>
  );
}
