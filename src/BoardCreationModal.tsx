import React, { useState } from "react";
import FormTextInput from "./FormTextInput";
import ModalTextInput from "./ModalTextInput";
export default function BoardCreationModal(props: any) {
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
