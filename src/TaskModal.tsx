import React, { useState } from "react";
import ModalTextInput from "./ModalTextInput";
import TaskMenu from "./SubTaskMenu";
export default function TaskModal() {
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
          <TaskMenu />
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
