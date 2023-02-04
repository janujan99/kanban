import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board, BoardDisplayUnit, Task } from "./kanbanStates";
import BoardCreatorModal from "./BoardCreatorModal";
import BoardDeletionWarningModal from "./BoardDeletionWarningModal";
import NavBar from "./NavBar";
import BoardDisplay from "./BoardDisplay";

function App() {
  const [boardDisplayUnit, setBoardDisplayUnit] = useState<BoardDisplayUnit>({
    boards: [],
    currentBoardIndex: 0,
  });
  function saveTask(
    boardIndex: number,
    colIndex: number,
    task: Task,
    edit: boolean = false
  ) {
    if (edit) {
    } else
      boardDisplayUnit.boards[boardIndex].columns[colIndex].tasks.push(task);
  }
  function saveBoard(board: Board, edit: boolean = false) {
    if (edit) {
      setBoardDisplayUnit((currentBoardUnit) => {
        let temp: Board[] = [];
        for (let i = 0; i < currentBoardUnit.boards.length; i++) {
          if (i == currentBoardUnit.currentBoardIndex) temp.push(board);
          else temp.push(currentBoardUnit.boards[i]);
        }
        return {
          boards: temp,
          currentBoardIndex: boardDisplayUnit.currentBoardIndex,
        };
      });
    } else {
      setBoardDisplayUnit((currentBoardUnit) => {
        let temp: Board[] = currentBoardUnit.boards.map((brd) => brd);
        temp.push({
          name: board.name,
          columns: board.columns.map((col) => col),
        });
        return { boards: temp, currentBoardIndex: temp.length - 1 };
      });
    }
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
        saveTask={saveTask}
        boardDisplayUnit={boardDisplayUnit}
        switchBoard={setCurrentBoard}
      />
      <BoardCreatorModal
        saveBoard={saveBoard}
        boardDisplayUnit={boardDisplayUnit}
        htmlForString="addBoardModal"
        title="New Board"
      />
      {boardDisplayUnit.boards.length > 0 && (
        <BoardCreatorModal
          saveBoard={saveBoard}
          boardDisplayUnit={boardDisplayUnit}
          htmlForString="editBoardModal"
          title={
            boardDisplayUnit.boards.length > 0
              ? boardDisplayUnit.boards[boardDisplayUnit.currentBoardIndex].name
              : ""
          }
        />
      )}
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
