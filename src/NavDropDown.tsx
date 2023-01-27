import React, { useState } from "react";
import { Board } from "./kanbanStates";
interface NavDropDownProps {
  boardList: Board[];
}
export default function NavDropDown(props: NavDropDownProps) {
  console.log(props.boardList);
  console.log("Hi");
  return (
    <div>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1 background bg-white">
          Platform Launch
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <h3>All boards ({props.boardList.length})</h3>
          {props.boardList.map((board) => (
            <li>
              <label>{board.name}</label>
            </li>
          ))}
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
