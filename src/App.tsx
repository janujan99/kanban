import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board, BoardDisplayUnit, Task } from "./kanbanStates";
import BoardCreatorModal from "./BoardCreatorModal";
import BoardDeletionWarningModal from "./BoardDeletionWarningModal";
import TaskViewerModal from "./TaskViewerModal";
import NavBar from "./NavBar";
import BoardDisplay from "./BoardDisplay";

function App() {
  const [boardDisplayUnit, setBoardDisplayUnit] = useState<BoardDisplayUnit>({
    boards: [],
    currBoardIndex: 0,
    currColumnIndex: -1,
    currTaskIndex: -1,
  });

  //if (boardDisplayUnit.boards.length > 0)
  //  console.log(boardDisplayUnit.boards[boardDisplayUnit.currBoardIndex]);
  console.log(boardDisplayUnit.currColumnIndex, boardDisplayUnit.currTaskIndex);

  function addTask(colIndex: number, task: Task) {
    let temp: Board[] = boardDisplayUnit.boards.map((i) => i);
    temp[boardDisplayUnit.currBoardIndex].columns[colIndex].tasks.push(task);
    setBoardDisplayUnit({
      boards: temp,
      currBoardIndex: boardDisplayUnit.currBoardIndex,
      currColumnIndex: colIndex,
      currTaskIndex:
        temp[boardDisplayUnit.currBoardIndex].columns[colIndex].tasks.length -
        1,
    });
  }
  function editTask(task: Task) {
    let currTasks: Task[] = boardDisplayUnit.boards[
      boardDisplayUnit.currBoardIndex
    ].columns[boardDisplayUnit.currColumnIndex].tasks.map((i: Task) => i);
    currTasks[boardDisplayUnit.currTaskIndex] = task;
    let tempBoards: Board[] = boardDisplayUnit.boards.map((i) => i);
    tempBoards[boardDisplayUnit.currBoardIndex].columns[
      boardDisplayUnit.currColumnIndex
    ].tasks = currTasks;
    setBoardDisplayUnit({
      boards: tempBoards,
      currBoardIndex: boardDisplayUnit.currBoardIndex,
      currColumnIndex: boardDisplayUnit.currColumnIndex,
      currTaskIndex: boardDisplayUnit.currTaskIndex,
    });
  }
  function saveBoard(board: Board, edit: boolean = false) {
    if (edit) {
      setBoardDisplayUnit((currentBoardUnit) => {
        let temp: Board[] = [];
        for (let i = 0; i < currentBoardUnit.boards.length; i++) {
          if (i == currentBoardUnit.currBoardIndex) temp.push(board);
          else temp.push(currentBoardUnit.boards[i]);
        }
        return {
          boards: temp,
          currBoardIndex: boardDisplayUnit.currBoardIndex,
          currColumnIndex: board.columns.length > 0 ? 0 : -1,
          currTaskIndex: -1,
        };
      });
    } else {
      setBoardDisplayUnit((currentBoardUnit) => {
        let temp: Board[] = currentBoardUnit.boards.map((brd) => brd);
        temp.push({
          name: board.name,
          columns: board.columns.map((col) => col),
        });
        return {
          boards: temp,
          currBoardIndex: temp.length - 1,
          currColumnIndex: currentBoardUnit.currColumnIndex,
          currTaskIndex: currentBoardUnit.currTaskIndex,
        };
      });
    }
  }
  function deleteBoard() {
    setBoardDisplayUnit({
      boards: boardDisplayUnit.boards.filter(
        (el, i) => i != boardDisplayUnit.currBoardIndex
      ),
      currBoardIndex:
        boardDisplayUnit.currBoardIndex - 1 > 0
          ? boardDisplayUnit.currBoardIndex - 1
          : 0,
      currColumnIndex: boardDisplayUnit.currColumnIndex,
      currTaskIndex: boardDisplayUnit.currTaskIndex,
    });
  }
  function setCurrentBoard(index: number) {
    setBoardDisplayUnit({
      boards: boardDisplayUnit.boards,
      currBoardIndex: index,
      currColumnIndex: boardDisplayUnit.currColumnIndex,
      currTaskIndex: boardDisplayUnit.currTaskIndex,
    });
  }
  function setCurrentTask(colIndex: number, taskIndex: number) {
    setBoardDisplayUnit({
      boards: boardDisplayUnit.boards,
      currBoardIndex: boardDisplayUnit.currBoardIndex,
      currColumnIndex: colIndex,
      currTaskIndex: taskIndex,
    });
  }
  return (
    <div className="App">
      <NavBar
        saveTask={addTask}
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
              ? boardDisplayUnit.boards[boardDisplayUnit.currBoardIndex].name
              : ""
          }
        />
      )}
      <BoardDisplay
        boardToDisplay={
          boardDisplayUnit.currBoardIndex >= 0
            ? boardDisplayUnit.boards[boardDisplayUnit.currBoardIndex]
            : null
        }
        setCurrentTask={setCurrentTask}
      />
      {boardDisplayUnit.currColumnIndex !== -1 &&
        boardDisplayUnit.currTaskIndex != -1 && (
          <TaskViewerModal
            task={
              boardDisplayUnit.boards[boardDisplayUnit.currBoardIndex].columns[
                boardDisplayUnit.currColumnIndex
              ].tasks[boardDisplayUnit.currTaskIndex]
            }
            editTask={editTask}
          />
        )}
      <BoardDeletionWarningModal deleteBoard={deleteBoard} />
    </div>
  );
}

export default App;
