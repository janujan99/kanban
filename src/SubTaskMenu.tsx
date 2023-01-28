import React, { useState } from "react";
import FormTextInput from "./FormTextInput";
export default function SubTaskMenu() {
  const [placeHolders, setPlaceHolders] = useState([
    "eg. Make coffee",
    "eg. Drink coffee & smile",
  ]);
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
