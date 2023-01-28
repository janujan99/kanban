import React, { useState } from "react";
import { Board } from "./kanbanStates";
interface BoardDisplayProps {
  boardToDisplay: Board | null;
}
export default function BoardDisplay(props: BoardDisplayProps) {
  if (props.boardToDisplay == null)
    return <h2>Create a board to get started</h2>;
  return (
    <div>
      {props.boardToDisplay.columns.map((col) => (
        <li>
          <h2>{col}</h2>
        </li>
      ))}
    </div>
  );
}
