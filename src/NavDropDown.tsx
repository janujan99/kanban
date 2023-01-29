import React, { useState } from "react";
import { Board } from "./kanbanStates";
interface NavDropDownProps {
  boardList: Board[];
  currentBoardIndex: number;
  switchBoard: (index: number) => void;
}
export default function NavDropDown(props: NavDropDownProps) {
  let boardDisplayList = [];
  for (let i = 0; i < props.boardList.length; i++) {
    boardDisplayList.push(
      <li>
        <label key={i} onClick={() => props.switchBoard(i)}>
          {props.boardList[i].name}
        </label>
      </li>
    );
  }
  return (
    <div>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1 background bg-white">
          {props.boardList.length > 0
            ? props.boardList[props.currentBoardIndex].name
            : "Kanban"}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <h3>All boards ({props.boardList.length})</h3>
          {boardDisplayList}
          <br></br>
          <li>
            <label htmlFor="my-modal2">+ Create New Board</label>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
