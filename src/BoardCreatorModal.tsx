import React, { useState } from "react";
import { Board, Column, BoardDisplayUnit } from "./kanbanStates";
import FormTextInput from "./FormTextInput";
import ModalTextInput from "./ModalTextInput";
interface BoardCreatorModalProps {
  addBoard: (board: Board) => void;
}
export default function BoardCreatorModal(props: BoardCreatorModalProps) {
  const [board, setBoard] = useState<Board>({
    name: "Board Title",
    columns: [
      { name: "Todo", tasks: [] },
      { name: "Doing", tasks: [] },
      { name: "Done", tasks: [] },
    ],
  });
  function removeColumn(s: string, index: number) {
    let temp: Column[] = [];
    for (let i = 0; i < board.columns.length; i++) {
      if (board.columns[i].name !== s || i !== index)
        temp.push(board.columns[i]);
    }
    setBoard({ name: board.name, columns: temp });
  }
  function editName(newName: string) {
    setBoard({ name: newName, columns: board.columns.map((col) => col) });
  }
  function addColumn() {
    setBoard({
      name: board.name,
      columns: board.columns.concat({ name: "New Column", tasks: [] }),
    });
  }
  function editColumn(newValue: string, index: number) {
    let temp: Column[] = board.columns.map((col) => col);
    temp[index].name = newValue;
    setBoard({ name: board.name, columns: temp });
  }
  let columnRows = [];
  for (let i = 0; i < board.columns.length; i++) {
    columnRows.push(
      <FormTextInput
        key={i}
        index={i}
        placeholder={board.columns[i].name}
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
              onClick={() => {
                props.addBoard(board);
                setBoard({
                  name: "New Board",
                  columns: [
                    { name: "Todo", tasks: [] },
                    { name: "Doing", tasks: [] },
                    { name: "Done", tasks: [] },
                  ],
                });
              }}
            >
              Save Changes
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
