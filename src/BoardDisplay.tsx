import React, { useState } from "react";
import { Board, Column, Task, SubTask } from "./kanbanStates";
interface BoardDisplayProps {
  boardToDisplay: Board | null;
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
          <h2>{col.name}</h2>
          {props.boardToDisplay!.columns[i].tasks.map((task, i) => (
            <li>{task.title}</li>
          ))}
        </li>
      ))}
      <label htmlFor="editBoardModal">+ Add New Column</label>
    </div>
  );
}
