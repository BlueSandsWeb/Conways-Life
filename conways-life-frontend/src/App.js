import React, { useState, useEffect } from 'react';
import './App.css';

import DisplayGrid from './components/DisplayGrid/DisplayGrid'


function App() {

  // ============== Hooks ============== //
  const [grid, setGrid] = useState([])
  const [changeState, setChangeState] = useState(false) // forces change state, grid is too nested to trigger a change

  // ============== Create empty grid ============== //
  useEffect(() => {
    let testArr = [];
    // Rows
    for (let i = 0; i < 15; i++) {
      testArr[i] = []
      // Columns
      for (let j = 0; j < 15; j++) {
        // Cells
        testArr[i][j] = 0;
      }
    }
    // console.log(testArr)
    setGrid(testArr)
  }, []);

  // ============== Click handler to change individual cells ============== //
  function changeCell(e) {
    e.preventDefault()
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    let newGrid = grid;
    newGrid[row][col] == 0 ? newGrid[row][col] = 1 : newGrid[row][col] = 0
    // console.log("CELL: ", newGrid[row][col])
    setGrid(newGrid)
    // console.log(grid)
    changeState === false ? setChangeState(true) : setChangeState(false)
  }

  // ============== Algorithm for conway's rules of life ============== //
  // ===== Start Game ===== //
  let timerId;
  function runGame() {
    // disable button after pressed once
    timerId = window.setInterval(rulesOfLife, 500)
  }
  // ===== Stop Game ===== //
  function stopGameOfLife(e) {
    e.preventDefault()
    window.clearInterval(timerId)
  }

  // ===== Algorithm for game ===== //
  function rulesOfLife() {
    // rule1: any live cell with fewer than two live neighbors dies, as if by underpopulation.
    // rule2: any live cell with two or three live neighbors lives on to the next generation.
    // rule3: any live cell with more than three live neighbors dies, as if by overpopulation
    // rule4: any dead cell with three live neighbors becomes a live cell, as if by reproduction.
    console.log("Loop")
    for (let row = 0; row < grid.length; row++) {
      // column loop
      for (let col = 0; col < grid[row].length; col++) {
        let count = 0;
        // write a check for each individual cell around it
        console.log("Row: ", row, "Col: ", col)
        // check stop
      }
    }
  }


  return (
    <div className="App">
      <div className="container">
        <DisplayGrid grid={grid} setGrid={setGrid} changeCell={changeCell} />
        <button onClick={runGame}>Start!</button>
        <button onClick={(e) => stopGameOfLife(e)}>STOP!!!</button>
        {/* TODO: Make reset button */}
      </div>
    </div>
  );
}

export default App;
