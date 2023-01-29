import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board, BoardDisplayUnit } from "./kanbanStates";
import BoardCreatorModal from "./BoardCreatorModal";
import BoardDeletionWarningModal from "./BoardDeletionWarningModal";
import NavBar from "./NavBar";
import BoardDisplay from "./BoardDisplay";

function App() {
  const [boardDisplayUnit, setBoardDisplayUnit] = useState<BoardDisplayUnit>({
    boards: [],
    currentBoardIndex: 0,
  });
  function addNewBoard(board: Board) {
    setBoardDisplayUnit((currentBoardUnit) => {
      let temp: Board[] = currentBoardUnit.boards.map((board) => board);
      temp.push({ name: board.name, columns: board.columns.map((col) => col) });
      return { boards: temp, currentBoardIndex: temp.length - 1 };
    });
  }
  function deleteBoard() {
    setBoardDisplayUnit({
      boards: boardDisplayUnit.boards.filter(
        (el, i) => i != boardDisplayUnit.currentBoardIndex
      ),
      currentBoardIndex:
        boardDisplayUnit.currentBoardIndex - 1 > 0
          ? boardDisplayUnit.currentBoardIndex - 1
          : 0,
    });
  }
  function setCurrentBoard(index: number) {
    setBoardDisplayUnit({
      boards: boardDisplayUnit.boards,
      currentBoardIndex: index,
    });
  }
  return (
    <div className="App">
      <NavBar
        boardList={boardDisplayUnit.boards}
        currentBoardIndex={boardDisplayUnit.currentBoardIndex}
        switchBoard={setCurrentBoard}
      />
      <BoardCreatorModal addBoard={addNewBoard} />
      <BoardDisplay
        boardToDisplay={
          boardDisplayUnit.currentBoardIndex >= 0
            ? boardDisplayUnit.boards[boardDisplayUnit.currentBoardIndex]
            : null
        }
      />
      <BoardDeletionWarningModal deleteBoard={deleteBoard} />
    </div>
  );
}

export default App;
