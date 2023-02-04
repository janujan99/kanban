import React, { useState } from "react";
import NavDropDown from "./NavDropDown";
import TaskModal from "./TaskModal";
import { Board, BoardDisplayUnit, Task } from "./kanbanStates";
interface NavBarProps {
  boardDisplayUnit: BoardDisplayUnit;
  switchBoard: (index: number) => void;
  saveTask: (boardIndex: number, colIndex: number, task: Task) => void;
}
export default function NavBar(props: NavBarProps) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <NavDropDown
          key="navdropdown1"
          boardDisplayUnit={props.boardDisplayUnit}
          switchBoard={props.switchBoard}
        />
        <TaskModal
          key="taskmodal1"
          boardDisplayUnit={props.boardDisplayUnit}
          saveTask={props.saveTask}
        />
      </div>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <label htmlFor="editBoardModal">+ Edit Board</label>
          </li>
          <li>
            <label htmlFor="deleteBoardModal">Delete Board</label>
          </li>
        </ul>
      </div>
    </div>
  );
}
