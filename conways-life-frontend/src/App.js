import React, { useState, useEffect} from 'react';
import './App.css';

import DisplayGrid from './components/DisplayGrid/DisplayGrid'


function App() {

  // ============== Hooks ============== //
  const [ grid, setGrid ] = useState([])
  
  
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
    console.log(testArr)
    setGrid(testArr)
  }, []);
  
  return (
    <div className="App">
      <div className="container">
        <DisplayGrid grid={grid} setGrid={setGrid} />
      </div>
    </div>
  );
}

export default App;
