import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

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
      />
      <label className="label">
        <span className="label-text-alt"></span>
        <span className="label-text-alt"></span>
      </label>
    </div>
  );
}
function SubTaskTextInput(props: any) {
  return (
    <div>
      <input
        type="text"
        placeholder={props.placeholder}
        className="input input-bordered w-full max-w-xs"
      />
      <button
        className="btn btn-circle"
        onClick={() => props.handleExitClick(props.index)}
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
  function addTask() {
    setPlaceHolders(placeHolders.concat(["eg. Make coffee"]));
  }
  function removeTask(taskId: number) {
    const halfBeforeTheUnwantedElement = placeHolders.slice(0, taskId);
    let halfAfterTheUnwantedElement: string[] = [];
    if (taskId + 1 < placeHolders.length)
      halfAfterTheUnwantedElement = placeHolders.slice(taskId + 1);

    const copyWithoutUnwantedElement = halfBeforeTheUnwantedElement.concat(
      halfAfterTheUnwantedElement
    );
    setPlaceHolders(copyWithoutUnwantedElement);
  }
  let subTaskRows = [];
  for (let i = 0; i < placeHolders.length; i++) {
    subTaskRows.push(
      <SubTaskTextInput
        index={i}
        placeholder={placeHolders[i]}
        handleExitClick={removeTask}
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
function Modal() {
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
function NavBar() {
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">kanban</a>
        <Modal />
      </div>
      <div className="flex-none"></div>
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;
