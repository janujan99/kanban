import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board } from "./kanbanStates";
function ModalTextInput(props: any) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{props.label}</span>
        <span className="label-text-alt"></span>
      </label>

      <input
        type="text"
        placeholder={props.placeholder}
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => props.handleChange(e.target.value)}
      />
      <label className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt"></span>
      </label>
    </div>
  );
}
function FormTextInput(props: any) {
  return (
    <div>
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.handleChange(e.target.value, props.index)}
        className="input input-bordered w-full max-w-xs"
      />
      <button
        className="btn btn-circle"
        onClick={() => props.handleExitClick(props.placeholder, props.index)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
function SubTaskMenu() {
  const [placeHolders, setPlaceHolders] = useState([
    "eg. Make coffee",
    "eg. Drink coffee & smile",
  ]);
  console.log(placeHolders);
  function addTask() {
    setPlaceHolders(placeHolders.concat(["eg. Make coffee"]));
  }
  function editTask(newValue: string, index: number) {
    let temp: string[] = placeHolders;
    temp[index] = newValue;
    setPlaceHolders(temp);
  }
  function removeTask(s: string, index: number) {
    let arr: string[] = [];
    for (let i = 0; i < placeHolders.length; i++) {
      if (placeHolders[i] !== s || i !== index) {
        arr.push(placeHolders[i]);
      }
    }
    setPlaceHolders(arr);
  }
  let subTaskRows = [];
  for (let i = 0; i < placeHolders.length; i++) {
    subTaskRows.push(
      <FormTextInput
        index={i}
        placeholder={placeHolders[i]}
        value={placeHolders[i]}
        handleExitClick={removeTask}
        handleChange={editTask}
      />
    );
  }
  return (
    <div>
      <label className="label">
        <span className="label-text">Subtask</span>
        <span className="label-text-alt"></span>
      </label>

      {subTaskRows}
      <button className="btn" onClick={() => addTask()}>
        + Add New Subtask
      </button>
    </div>
  );
}
function TaskModal() {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn">
        + New Task
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Task</h3>
          <ModalTextInput label="Title" placeholder="eg. Take coffee break" />
          <ModalTextInput
            label="Description"
            placeholder="e.g. It's always good to take a break. The 15 minute break will recharge the batteries a little."
          />
          <SubTaskMenu />
          <label className="label">
            <span className="label-text">Status</span>
            <span className="label-text-alt"></span>
          </label>
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              Click
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Submit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
function NavDropDown(props: any) {
  let boardNames = [];
  for (let i = 0; i < props.boardList.length; i++)
    boardNames.push(
      <li>
        <label>{props.boardList[i].name}</label>
      </li>
    );
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
          {boardNames}
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
function BoardCreationModal(props: any) {
  const [board, setBoard] = useState({
    name: "Board Title",
    columns: ["Todo", "Doing", "Done"],
  });
  console.log(board);
  function removeColumn(s: string, index: number) {
    console.log(s + index);
    let temp: string[] = [];
    for (let i = 0; i < board.columns.length; i++) {
      if (board.columns[i] !== s || i !== index) temp.push(board.columns[i]);
    }
    setBoard({ name: board.name, columns: temp });
  }
  function editName(newName: string) {
    setBoard({ name: newName, columns: board.columns });
  }
  function addColumn() {
    setBoard({
      name: board.name,
      columns: board.columns.concat(["New Column"]),
    });
  }
  function editColumn(newValue: string, index: number) {
    let temp: string[] = board.columns;
    temp[index] = newValue;
    setBoard({ name: board.name, columns: temp });
  }
  let columnRows = [];
  for (let i = 0; i < board.columns.length; i++) {
    columnRows.push(
      <FormTextInput
        key={i}
        index={i}
        placeholder={board.columns[i]}
        handleExitClick={removeColumn}
        handleChange={editColumn}
      />
    );
  }
  return (
    <div>
      <input type="checkbox" id="my-modal2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Board</h3>
          <ModalTextInput
            label="Board Name"
            placeholder="New Board"
            handleChange={editName}
          />
          <label className="label">
            <span className="label-text">Board Columns</span>
            <span className="label-text-alt"></span>
          </label>
          {columnRows}
          <button className="btn" onClick={() => addColumn()}>
            + Add New Column
          </button>
          <div className="modal-action">
            <label
              htmlFor="my-modal2"
              className="btn"
              onClick={() => props.save(board)}
            >
              Save Changes
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
function NavBar(props: any) {
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
        <NavDropDown boardList={props.boardList} />
        <TaskModal />
      </div>
      <div className="flex-none"></div>
    </div>
  );
}
function App() {
  const newBoards: Board[] = [];
  const [boards, setBoards] = useState(newBoards);
  function saveBoard(board: Board) {
    let temp: Board[] = boards;
    temp.push({ name: board.name, columns: board.columns });
    console.log(temp);
    setBoards(temp);
  }
  return (
    <div className="App">
      <NavBar boardList={boards} />
      <BoardCreationModal boardList={boards} save={saveBoard} />
    </div>
  );
}

export default App;
