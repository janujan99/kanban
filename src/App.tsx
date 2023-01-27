import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board } from "./kanbanStates";
import BoardCreationModal from "./BoardCreationModal";
import NavBar from "./NavBar";
function App() {
  const newBoards: Board[] = [];
  const [boards, setBoards] = useState(newBoards);
  console.log(boards);
  function addNewBoard(board: Board) {
    let temp: Board[] = boards;
    temp.push({ name: board.name, columns: board.columns.map((col) => col) });
    setBoards(temp);
    console.log(temp);
  }
  return (
    <div className="App">
      <NavBar boardList={boards} />
      <BoardCreationModal save={addNewBoard} />
    </div>
  );
}

export default App;
