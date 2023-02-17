import React, { useState } from "react";
import { Board, Column, Task, SubTask } from "./kanbanStates";
import "./TaskDisplayUnit.css";
import TaskDisplayUnit from "./TaskDisplayUnit";
interface BoardDisplayProps {
  boardToDisplay: Board | null;
  setCurrentTask: (a: number, b: number) => void;
  setTaskModalMode: (mode: "view" | "edit" | "delete") => void;
}
export default function BoardDisplay(props: BoardDisplayProps) {
  //console.log(JSON.stringify(props.boardToDisplay));
  if (props.boardToDisplay == null)
    return <h2>Create a board to get started</h2>;
  else if (props.boardToDisplay.columns.length == 0)
    return (
      <div>
        <h2>This board is empty. Add a column to get started</h2>
        <button>Add column</button>
      </div>
    );
  return (
    <div>
      {props.boardToDisplay.columns.map((col, i) => (
        <li key={i}>
          <h1>{col.name}</h1>
          {props.boardToDisplay!.columns[i].tasks.map((task, j) => (
            <TaskDisplayUnit
              task={task}
              setCurrentTask={() => props.setCurrentTask(i, j)}
              setTaskModalMode={props.setTaskModalMode}
            />
          ))}
        </li>
      ))}
      <label htmlFor="editBoardModal">+ Add New Column</label>
    </div>
  );
}
