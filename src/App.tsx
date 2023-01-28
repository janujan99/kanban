import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board } from "./kanbanStates";
import BoardCreationModal from "./BoardCreationModal";
import NavBar from "./NavBar";
import BoardDisplay from "./BoardDisplay";
interface BoardDisplay {
  boards: Board[];
  currentBoardIndex: number;
}
function App() {
  const [boardDisplayUnit, setBoardDisplayUnit] = useState<BoardDisplay>({
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
        switchBoard={setCurrentBoard}
      />
      <BoardCreationModal save={addNewBoard} />
      <BoardDisplay
        boardToDisplay={
          boardDisplayUnit.boards[boardDisplayUnit.currentBoardIndex]
        }
      />
    </div>
  );
}

export default App;
