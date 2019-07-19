import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import DisplayGrid from './components/DisplayGrid/DisplayGrid'
import { useInterval } from './hooks/useInterval'

let stop = false;
let tempArr;

function App() {

  // ============== Hooks ============== //
  const [grid, setGrid] = useState([])
  const [changeState, setChangeState] = useState(false) // forces change state, grid is too nested to trigger a change
  const [generation, setGeneration] = useState(1)
  const [interval, setInterval] = useState(null)
  const [speed, setSpeed] = useState(300)
  const [gridSize, setGridSize] = useState(15)

  const refGeneration = useRef();
  refGeneration.current = generation; // set current state of generation 

  const refGrid = useRef();
  refGrid.current = grid;

  // ============== Create empty grid ============== //
  useEffect(() => {
    let arr = makeBlankGrid()
    setGrid(arr)
  }, [tempArr]);

  useEffect(() => {
    let arr = makeBlankGrid()
    setGrid(arr)
  }, [gridSize]);

  function makeBlankGrid() {
    let testArr = [];
    // Rows
    for (let i = 0; i < gridSize; i++) {
      testArr[i] = []
      // Columns
      for (let j = 0; j < gridSize; j++) {
        // Cells
        testArr[i][j] = 0;
      }
    }
    return testArr
  }

  function clear() {
    let tempArr = makeBlankGrid()
    setGrid(tempArr);
    setGeneration(0);
    setInterval(null);
  }

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

  // const runGame = () => {
  //   timerId = requestAnimationFrame(rulesOfLife, 1000 / 60);
  //   stop = false;
  // };

  function runGame() {
    setInterval(speed);
  }

  function stopGameOfLife() {
    setInterval(null);
  }

  useInterval(() => {
    rulesOfLife();
  }, interval);

  // ===== Stop Game ===== //
  // const stopGameOfLife = () => {
  //   stop = true;
  //   cancelAnimationFrame(timerId);
  //   console.log("Stopped");
  // };

  const checkGeneration = () => {
    setGeneration(refGeneration.current + 1);
  };

  useEffect(() => {
    checkGeneration();
  }, [refGeneration]);

  // ===== Algorithm for game ===== //
  function rulesOfLife() {
    // rule1: any live cell with fewer than two live neighbors dies, as if by underpopulation.
    // rule2: any live cell with two or three live neighbors lives on to the next generation.
    // rule3: any live cell with more than three live neighbors dies, as if by overpopulation
    // rule4: any dead cell with three live neighbors becomes a live cell, as if by reproduction.
    let tempArr = makeBlankGrid();
    checkGeneration();
    console.log("Running");

    if (!stop) {
      for (let row = 0; row < grid.length; row++) {
        // column loop
        for (let col = 0; col < grid[row].length; col++) {
          let count = numNeighbors(row, col);

          // cell logic
          if (count < 2) {
            tempArr[row][col] = 0;
          } else if (count === 2) {
            tempArr[row][col] = grid[row][col];
          } else if (count === 3) {
            tempArr[row][col] = 1;
          } else {
            tempArr[row][col] = 0;
          }
        }
      }
      setGrid(tempArr);
      if (stop) {
        return null;
      }
    }
  }

  // [[0,0,0,1,0,1],
  //  [0,1,0,0,0,1],
  //  [0,0,1,0,0,1],
  //  [0,1,0,0,0,1]]

  //  ===== count number of neighbors for a cell ====== //
  function numNeighbors(row, col) {
    let count = 0;
    if (row !== 0 && col !== 0) {                   // check top left
      count += grid[row - 1][col - 1]
    }

    if (row !== 0) {                                // check top
      count += grid[row - 1][col]
    }

    if (row !== 0 && col !== grid.length - 1) {     // check top right
      count += grid[row - 1][col + 1]
    }

    if (col !== 0) {                                // check left
      count += grid[row][col - 1]
    }

    if (col !== grid.length - 1) {                  // check right
      count += grid[row][col + 1]
    }

    if (row !== grid.length - 1 && col !== 0) {     // check bottom left
      count += grid[row + 1][col - 1]
    }
    // check bottom
    if (row !== grid.length - 1) {
      count += grid[row + 1][col]
    }
    // check bottom right
    if (row !== grid.length - 1 && col !== grid.length - 1) {
      count += grid[row + 1][col + 1]
    }
    return count;
  }

  // ================== Control functions ===================== //
  function handleSpeedChange(e) {
    e.preventDefault()
    setSpeed(e.target.value)
  }
  function handleGridSizeChange(e) {
    e.preventDefault()
    setGridSize(e.target.value)
  }

  function presetCenterLine() {
    let tempArr = makeBlankGrid();
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i][parseInt(tempArr.length / 2)] = 1
    }
    setGrid(tempArr);
  }

  function presetCross() {
    let tempArr = makeBlankGrid();
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i][parseInt(tempArr.length / 2)] = 1
    }
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[parseInt(tempArr.length / 2)][i] = 1
    }
    setGrid(tempArr);
  }

  function presetFlower() {
    let tempArr = makeBlankGrid();
    let center = parseInt(tempArr.length / 2)
    // change center
    tempArr[center][center] = 1
    // change above center
    tempArr[center - 2][center] = 1
    tempArr[center - 2][center - 1] = 1
    tempArr[center - 2][center + 1] = 1

    // change below center
    tempArr[center + 2][center] = 1
    tempArr[center + 2][center - 1] = 1
    tempArr[center + 2][center + 1] = 1

    setGrid(tempArr)
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Conway's game of life</h1>
        <div className="sideBySide">
          <div className="gameOfLife">
            <DisplayGrid grid={grid} setGrid={setGrid} changeCell={changeCell} />
            <p>Generations: {generation}</p>
          </div>
          <div className="controls">
            {/* <button onClick={runGame}>Start!</button>
            <button onClick={(e) => stopGameOfLife(e)}>STOP!!!</button>
            <button onClick={(e) => clear(e)}>clear</button> */}
            <placeholder>Speed:
              <input type="number" value={speed} onChange={handleSpeedChange} />
            </placeholder>
            <placeholder>Size:
              <input type="number" value={gridSize} onChange={handleGridSizeChange} />
            </placeholder>
            <div className="menuContainer">
              <div class="menu-button">
                <span>Menu</span>
                <p onClick={presetCenterLine}><span>Line</span></p>
                <p onClick={presetCross}><span>cross</span></p>
                <p onClick={presetFlower}><span>flower</span></p>
                <p onClick={runGame}>Start!</p>
                <p onClick={(e) => stopGameOfLife(e)}>Stop</p>
                <p onClick={(e) => clear(e)}>clear</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <h1>Animated Material Design Button</h1>

    </div>
  );
}

export default App;


// do a write up for conway's game of life (essay)

// Sprint Challenge interview question: You have 5 minutes, teach me something.