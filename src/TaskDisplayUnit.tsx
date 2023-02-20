import React, { useState } from "react";
import { Task, SubTask } from "./kanbanStates";

interface TaskDisplayUnitProps {
  task: Task;
  setCurrentTask: () => void;
  setTaskModalMode: (mode: "view" | "edit" | "delete") => void;
}

export default function TaskDisplayUnit(props: TaskDisplayUnitProps) {
  let numSubTasksCompleted: number = props.task.subTasks.filter(
    (x: SubTask) => x.isCompleted
  ).length;
  let totalSubTasks: number = props.task.subTasks.length;
  return (
    <label htmlFor="taskViewerModal" onClick={props.setCurrentTask}>
      <div className="taskDisplayUnit">
        <h1 className="taskTitle">{props.task.title}</h1>
        <h3 className="numSubTasksCompleted">
          {numSubTasksCompleted} of {totalSubTasks} subtasks
        </h3>
      </div>
    </label>
  );
}
