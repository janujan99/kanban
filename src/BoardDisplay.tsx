import React, { useState } from "react";
import { Board, Column, Task, SubTask } from "./kanbanStates";
import "./TaskDisplayUnit.css";
import "./BoardDisplay.css";
import TaskDisplayUnit from "./TaskDisplayUnit";
interface BoardDisplayProps {
  boardToDisplay: Board | null;
  setCurrentTask: (a: number, b: number) => void;
  setTaskModalMode: (mode: "view" | "edit" | "delete") => void;
}
export default function BoardDisplay(props: BoardDisplayProps) {
  //console.log(JSON.stringify(props.boardToDisplay));
  if (props.boardToDisplay == null)
    return <div style={{ backgroundImage: "boeing-777-45414-2560x1600.jpg", height: "100%", width: "100%" }}>
      <h2 className="color-white">Create a board to get started</h2>
    </div>;
  else if (props.boardToDisplay.columns.length === 0)
    return (
      <div>
        <h2>This board is empty. Add a column to get started</h2>
        <button>Add column</button>
      </div>
    );
  return (
    <div style={{ backgroundColor: "#f4f7fd", height: "100%", width: "100%" }}>
      <div className="boardColumnsAndTasks">
        {props.boardToDisplay.columns.map((col, i) => (
          <li key={i} className="listColumn list-none mt-3 mb-4">
            <h1 className="columnTitle">{col.name.toUpperCase()}</h1>
            {props.boardToDisplay!.columns[i].tasks.map((task, j) => (
              <TaskDisplayUnit
                task={task}
                setCurrentTask={() => props.setCurrentTask(i, j)}
                setTaskModalMode={props.setTaskModalMode}
              />
            ))}
          </li>
        ))}
        <label htmlFor="editBoardModal" className="btn bg-custom h-full">
          {props.boardToDisplay!.columns.length > 0
            ? "+ New Column"
            : "+ Add New Column"}
        </label>
      </div>
    </div>
  );
}
