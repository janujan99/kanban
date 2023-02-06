import React, { useState } from "react";
import { Board, Column, BoardDisplayUnit } from "./kanbanStates";
import FormTextInput from "./FormTextInput";
import ModalTextInput from "./ModalTextInput";
interface BoardCreatorModalProps {
  addColumn: () => void;
  editColumn: (newValue: string, index: number) => void;
  editName: (newName: string) => void;
  removeColumn: (index: number) => void;
  addBoard: () => void;
  editBoard: () => void;
  modalBoard: Board;
  htmlForString: string;
  title: string;
}

export default function BoardCreatorModal(props: BoardCreatorModalProps) {
  console.log(props.modalBoard);
  function removeColumn(index: number) {
    props.removeColumn(index);
  }
  function editName(newName: string) {
    props.editName(newName);
  }
  function addColumn() {
    props.addColumn();
  }
  function editColumn(newValue: string, index: number) {
    props.editColumn(newValue, index);
  }
  let columnRows = [];
  for (let i = 0; i < props.modalBoard.columns.length; i++) {
    columnRows.push(
      <FormTextInput
        key={i}
        index={i}
        placeholder={props.modalBoard.columns[i].name}
        value={props.modalBoard.columns[i].name}
        handleExitClick={removeColumn}
        handleChange={editColumn}
      />
    );
  }
  return (
    <div>
      <input
        type="checkbox"
        id={props.htmlForString}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {props.htmlForString == "addBoardModal"
              ? "Add New Board"
              : "Edit Board"}
          </h3>
          <ModalTextInput
            label="Board Name"
            placeholder={props.modalBoard.name}
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
              htmlFor={props.htmlForString}
              className="btn"
              onClick={
                props.htmlForString == "addBoardModal"
                  ? props.addBoard
                  : props.editBoard
              }
            >
              Save Changes
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
