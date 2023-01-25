import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Board } from "./kanbanStates";
import BoardCreationModal from "./BoardCreationModal";
import NavBar from "./NavBar";
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
