import React, { useState } from "react";
import { Board, BoardDisplayUnit } from "./kanbanStates";
interface SideBarProps {
  boardDisplayUnit: BoardDisplayUnit;
  switchBoard: (index: number) => void;
  resetModalBoardToAddMode: () => void;
  hideSideBar: () => void;
}
export default function SideBar(props: SideBarProps) {
  return (
    <>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <h1 className="mb-1/8 mt-1/8">Kanban</h1>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          {props.boardDisplayUnit.boards.map((board) => (
            <li>
              <a>{board.name}</a>
            </li>
          ))}
          <li>
            <label
              htmlFor="addBoardModal"
              onClick={props.resetModalBoardToAddMode}
              className="background bg-white"
            >
              + Create New Board
            </label>
          </li>
          <li>
            <button className="btn" onClick={() => props.hideSideBar()}>
              Hide Sidebar
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
