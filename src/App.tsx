import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board, BoardDisplayUnit, Task, Column } from "./kanbanStates";
import BoardCreatorModal from "./BoardCreatorModal";
import BoardDeletionWarningModal from "./BoardDeletionWarningModal";
import TaskViewerModal from "./TaskViewerModal";
import NavBar from "./NavBar";
import BoardDisplay from "./BoardDisplay";

function App() {
  const [boardDisplayData, setBoardDisplayData] = useState<BoardDisplayUnit>({
    boards: [],
    currBoardIndex: -1,
    currColumnIndex: -1,
    currTaskIndex: -1,
  });

  const [modalBoard, setModalBoard] = useState<Board | null>({
    name: "New Board",
    columns: [
      { name: "Todo", tasks: [] },
      { name: "Doing", tasks: [] },
      { name: "Done", tasks: [] },
    ],
  });
  const [modalTask, setModalTask] = useState<Task | null>(null);

  function getObjectDeepCopy(a: Object) {
    return JSON.parse(JSON.stringify(a));
  }
  //modal Board functions
  function resetModalBoardToNull() {
    setModalBoard(null);
  }
  function resetModalBoardToAddMode() {
    setModalBoard(
      getObjectDeepCopy({
        name: "New Board",
        columns: [
          { name: "Todo", tasks: [] },
          { name: "Doing", tasks: [] },
          { name: "Done", tasks: [] },
        ],
      })
    );
  }
  function resetModalBoardToEditMode() {
    setModalBoard(getObjectDeepCopy(getCurrentBoard()!));
  }

  function addBoardFromModal() {
    let temp = getObjectDeepCopy(boardDisplayData)
      .boards.map((b: Board) => b)
      .concat([getObjectDeepCopy(modalBoard!)]);
    setBoardDisplayData(
      getObjectDeepCopy({
        boards: temp,
        currBoardIndex: temp.length - 1,
        currColumnIndex: boardDisplayData.currColumnIndex,
        currTaskIndex: boardDisplayData.currTaskIndex,
      })
    );
    resetModalBoardToNull();
  }
  function editBoardFromModal() {
    let temp = boardDisplayData.boards.map((b) => b);
    temp[boardDisplayData.currBoardIndex] = modalBoard!;
    setBoardDisplayData({
      boards: temp,
      currBoardIndex: boardDisplayData.currBoardIndex,
      currColumnIndex: boardDisplayData.currColumnIndex,
      currTaskIndex: boardDisplayData.currTaskIndex,
    });
    resetModalBoardToNull();
  }
  function addColumnToModalBoard() {
    setModalBoard(
      getObjectDeepCopy({
        name: modalBoard!.name,
        columns: modalBoard!.columns.concat({ name: "New Column", tasks: [] }),
      })
    );
  }
  function editColumnInModalBoard(s: string, i: number) {
    let temp: Column[] = getObjectDeepCopy(modalBoard!).columns;
    temp[i].name = s;
    setModalBoard(getObjectDeepCopy({ name: modalBoard!.name, columns: temp }));
  }
  function editNameInModalBoard(newName: string) {
    setModalBoard({ name: newName, columns: modalBoard!.columns });
  }
  function removeColumnFromModalBoard(index: number) {
    let temp: Column[] = [];
    for (let i = 0; i < modalBoard!.columns.length; i++) {
      if (i !== index) temp.push(modalBoard!.columns[i]);
    }
    setModalBoard({ name: modalBoard!.name, columns: temp });
  }
  function getCurrentBoard() {
    if (boardDisplayData.currBoardIndex < 0) return null;
    return boardDisplayData.boards[boardDisplayData.currBoardIndex];
  }

  function getCurrentTask() {
    if (
      boardDisplayData.currColumnIndex < 0 ||
      boardDisplayData.currTaskIndex < 0
    )
      return null;
    return boardDisplayData.boards[boardDisplayData.currBoardIndex].columns[
      boardDisplayData.currColumnIndex
    ].tasks[boardDisplayData.currTaskIndex];
  }

  function addTask(colIndex: number, task: Task) {
    let temp: Board[] = boardDisplayData.boards.map((i) => i);
    temp[boardDisplayData.currBoardIndex].columns[colIndex].tasks.push(task);
    setBoardDisplayData({
      boards: temp,
      currBoardIndex: boardDisplayData.currBoardIndex,
      currColumnIndex: colIndex,
      currTaskIndex:
        temp[boardDisplayData.currBoardIndex].columns[colIndex].tasks.length -
        1,
    });
  }
  function editTask(task: Task) {
    let currTasks: Task[] = boardDisplayData.boards[
      boardDisplayData.currBoardIndex
    ].columns[boardDisplayData.currColumnIndex].tasks.map((i: Task) => i);
    currTasks[boardDisplayData.currTaskIndex] = task;
    let tempBoards: Board[] = boardDisplayData.boards.map((i) => i);
    tempBoards[boardDisplayData.currBoardIndex].columns[
      boardDisplayData.currColumnIndex
    ].tasks = currTasks;
    setBoardDisplayData({
      boards: tempBoards,
      currBoardIndex: boardDisplayData.currBoardIndex,
      currColumnIndex: boardDisplayData.currColumnIndex,
      currTaskIndex: boardDisplayData.currTaskIndex,
    });
  }
  function saveBoard(board: Board, edit: boolean = false) {
    if (edit) {
      setBoardDisplayData((currentBoardUnit) => {
        let temp: Board[] = [];
        for (let i = 0; i < currentBoardUnit.boards.length; i++) {
          if (i == currentBoardUnit.currBoardIndex) temp.push(board);
          else temp.push(currentBoardUnit.boards[i]);
        }
        return {
          boards: temp,
          currBoardIndex: boardDisplayData.currBoardIndex,
          currColumnIndex: board.columns.length > 0 ? 0 : -1,
          currTaskIndex: -1,
        };
      });
    } else {
      setBoardDisplayData((currentBoardUnit) => {
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
    setBoardDisplayData({
      boards: boardDisplayData.boards.filter(
        (el, i) => i != boardDisplayData.currBoardIndex
      ),
      currBoardIndex:
        boardDisplayData.currBoardIndex - 1 > 0
          ? boardDisplayData.currBoardIndex - 1
          : 0,
      currColumnIndex: boardDisplayData.currColumnIndex,
      currTaskIndex: boardDisplayData.currTaskIndex,
    });
  }
  function setCurrentBoard(index: number) {
    setBoardDisplayData({
      boards: boardDisplayData.boards,
      currBoardIndex: index,
      currColumnIndex: boardDisplayData.currColumnIndex,
      currTaskIndex: boardDisplayData.currTaskIndex,
    });
  }
  function setCurrentTask(colIndex: number, taskIndex: number) {
    setBoardDisplayData({
      boards: boardDisplayData.boards,
      currBoardIndex: boardDisplayData.currBoardIndex,
      currColumnIndex: colIndex,
      currTaskIndex: taskIndex,
    });
  }

  return (
    <div className="App">
      <NavBar
        saveTask={addTask}
        boardDisplayUnit={boardDisplayData}
        switchBoard={setCurrentBoard}
        resetModalBoardToAddMode={resetModalBoardToAddMode}
        resetModalBoardToEditMode={resetModalBoardToEditMode}
      />
      {modalBoard != null && (
        <BoardCreatorModal
          addColumn={addColumnToModalBoard}
          editColumn={editColumnInModalBoard}
          editName={editNameInModalBoard}
          removeColumn={removeColumnFromModalBoard}
          addBoard={addBoardFromModal}
          editBoard={editBoardFromModal}
          modalBoard={modalBoard!}
          htmlForString="addBoardModal"
          title="New Board"
        />
      )}
      {getCurrentBoard() !== null && modalBoard != null && (
        <BoardCreatorModal
          addColumn={addColumnToModalBoard}
          editColumn={editColumnInModalBoard}
          editName={editNameInModalBoard}
          removeColumn={removeColumnFromModalBoard}
          addBoard={addBoardFromModal}
          editBoard={editBoardFromModal}
          modalBoard={modalBoard!}
          htmlForString="editBoardModal"
          title={getCurrentBoard()!.name}
        />
      )}
      <BoardDisplay
        boardToDisplay={getCurrentBoard()}
        setCurrentTask={setCurrentTask}
      />
      {getCurrentTask() != null && (
        <TaskViewerModal task={getCurrentTask()!} editTask={editTask} />
      )}
      <BoardDeletionWarningModal deleteBoard={deleteBoard} />
    </div>
  );
}

export default App;
