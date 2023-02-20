import React, { useState } from "react";
import { Board, BoardDisplayUnit } from "./kanbanStates";
//import "./NavDropDown.css";
interface NavDropDownProps {
  boardDisplayUnit: BoardDisplayUnit;
  switchBoard: (index: number) => void;
  resetModalBoardToAddMode: () => void;
}
export default function NavDropDown(props: NavDropDownProps) {
  let boardDisplayList = [];
  for (let i = 0; i < props.boardDisplayUnit.boards.length; i++) {
    boardDisplayList.push(
      <li>
        <label key={i} onClick={() => props.switchBoard(i)}>
          {props.boardDisplayUnit.boards[i].name}
        </label>
      </li>
    );
  }
  return (
    <div>
      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn m-1 background bg-white border-none text-black"
        >
          {props.boardDisplayUnit.boards.length > 0
            ? props.boardDisplayUnit.boards[
                props.boardDisplayUnit.currBoardIndex
              ].name + "      ˅"
            : "Kanban"}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <h3>All boards ({props.boardDisplayUnit.boards.length})</h3>
          {boardDisplayList}
          <br></br>
          <li>
            <label
              htmlFor="addBoardModal"
              onClick={props.resetModalBoardToAddMode}
              className="background bg-white"
            >
              + Create New Board
            </label>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
