import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board, BoardDisplayUnit, Task, Column, SubTask } from "./kanbanStates";
import BoardCreatorModal from "./BoardCreatorModal";
import BoardDeletionWarningModal from "./BoardDeletionWarningModal";
import TaskViewerModal from "./TaskViewerModal";
import NavBar from "./NavBar";
import BoardDisplay from "./BoardDisplay";
import TaskModal from "./TaskModal";

function App() {
  const [boardDisplayData, setBoardDisplayData] = useState<BoardDisplayUnit>({
    boards: [],
    currBoardIndex: 0,
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

  const [columnToAddTaskTo, setColumnToAddTaskTo] = useState<number>(0);
  console.log(modalTask);
  function getObjectDeepCopy(a: Object) {
    return JSON.parse(JSON.stringify(a));
  }
  //modal Task functions
  function setColumnForTask(i: number) {
    setColumnToAddTaskTo(() => i);
  }
  function resetModalTaskToNull() {
    setModalTask((prevTask) => null);
  }
  function resetModalTaskToAddMode() {
    setModalTask({
      title: "eg. Take coffee break",
      description:
        "e.g. It's always good to take a break. The 15 minute break will recharge the batteries a little.",
      subTasks: [
        { title: "eg. Make coffee", isCompleted: false },
        { title: "eg. Drink coffee and smile", isCompleted: false },
      ],
    });
  }
  function resetModalTaskToEditMode() {
    setModalTask(getCurrentTask()!);
  }
  function addTaskFromModal() {
    let tempBoardDisplayUnit: BoardDisplayUnit =
      getObjectDeepCopy(boardDisplayData);
    tempBoardDisplayUnit.boards[boardDisplayData.currBoardIndex].columns[
      columnToAddTaskTo
    ].tasks.push(getObjectDeepCopy(modalTask!));
    setBoardDisplayData(getObjectDeepCopy(tempBoardDisplayUnit));
    resetModalTaskToNull();
  }
  function editTaskFromModal() {
    let tempBoardDisplayUnit: BoardDisplayUnit =
      getObjectDeepCopy(boardDisplayData);
  }
  function editTitleInModalTask(newName: string) {
    let temp: Task = getObjectDeepCopy(modalTask!);
    temp.title = newName;
    setModalTask(getObjectDeepCopy(temp));
  }
  function editDescriptionInModalTask(newDescription: string) {
    let temp: Task = getObjectDeepCopy(modalTask!);
    temp.description = newDescription;
    setModalTask(getObjectDeepCopy(temp));
  }
  function addSubTaskToModalTask() {
    let temp: Task = getObjectDeepCopy(modalTask!);
    temp.subTasks = temp.subTasks.concat({
      title: "eg. Make coffee",
      isCompleted: false,
    });

    setModalTask(getObjectDeepCopy(temp));
  }
  function removeSubTaskFromModalTask(index: number) {
    let tempTask: Task = getObjectDeepCopy(modalTask!);

    let newSubTasks: SubTask[] = [];

    for (let i = 0; i < tempTask.subTasks.length; i++) {
      if (i !== index) newSubTasks.push(tempTask.subTasks[i]);
    }

    tempTask.subTasks = newSubTasks.map((st: SubTask) => getObjectDeepCopy(st));

    setModalTask(tempTask);
  }
  function toggleSubTaskCompletion(index: number) {
    let tempBoardUnit: BoardDisplayUnit = getObjectDeepCopy(boardDisplayData!);
    //toggle value of subtask directly in the temporary baord
    tempBoardUnit.boards[tempBoardUnit.currBoardIndex].columns[
      tempBoardUnit.currColumnIndex
    ].tasks[tempBoardUnit.currTaskIndex].subTasks[index].isCompleted =
      !tempBoardUnit.boards[tempBoardUnit.currBoardIndex].columns[
        tempBoardUnit.currColumnIndex
      ].tasks[tempBoardUnit.currTaskIndex].subTasks[index].isCompleted;
    setBoardDisplayData(getObjectDeepCopy(tempBoardUnit));
  }
  function editSubTaskTitleInModalTask(value: string, index: number) {
    let temp: Task = getObjectDeepCopy(modalTask!);
    temp.subTasks[index].title = value;
    setModalTask(getObjectDeepCopy(temp));
  }
  //modal Board functions
  function resetModalBoardToNull() {
    setModalBoard((prevBoard) => null);
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
        currColumnIndex: 0,
        currTaskIndex: 0,
      })
    );
    resetModalBoardToNull();
    setColumnToAddTaskTo(() => 0);
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
    if (
      boardDisplayData.currBoardIndex < 0 ||
      boardDisplayData.boards.length == 0
    )
      return null;
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
        boardDisplayUnit={boardDisplayData}
        switchBoard={setCurrentBoard}
        resetModalBoardToAddMode={resetModalBoardToAddMode}
        resetModalBoardToEditMode={resetModalBoardToEditMode}
        resetModalTaskToAddMode={resetModalTaskToAddMode}
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
      {modalTask != null && (
        <TaskModal
          key="taskmodal1"
          editName={editTitleInModalTask}
          editDescription={editDescriptionInModalTask}
          addSubTask={addSubTaskToModalTask}
          editSubTaskTitle={editSubTaskTitleInModalTask}
          removeSubTask={removeSubTaskFromModalTask}
          setColumnForTask={setColumnForTask}
          addTaskToBoard={addTaskFromModal}
          columnList={
            boardDisplayData.boards[boardDisplayData.currBoardIndex].columns
          }
          columnNumberToAddTaskTo={columnToAddTaskTo}
          modalTask={modalTask!}
        />
      )}
      {getCurrentTask() != null && (
        <TaskViewerModal
          task={getCurrentTask()!}
          editTask={editTask}
          toggleSubTask={toggleSubTaskCompletion}
        />
      )}
      <BoardDeletionWarningModal deleteBoard={deleteBoard} />
    </div>
  );
}

export default App;
