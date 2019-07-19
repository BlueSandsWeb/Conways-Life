## Conway’s Game of life Description:

Conway’s game of life is a cellular automaton game. Game of life is a zero player game where the user picks or creates a configuration of cells that are either alive or dead that live, reproduce or die off from under or overpopulation.  The game of life has four rules:

1. Any live cell with fewer than two live neighbors dies, as if by under population.
2.Any live cell with two or three live neighbors lives on to the next generation.
3.Any live cell with more than three live neighbors dies, as if by overpopulation.
4.Any dead cell with three live neighbors becomes a live cell, as if by reproduction.

The starting pattern is called the seed of the system. The first generation is created by applying the four rules simultaneously to every cell in the seed.  Births and deaths occur simultaneously and the discrete moment at which this happens is called a tick.  Each generation is purely a the output of the function of the previous generation.   The rules will continuously be applied to create future generations.

## How I Implemented it:

The data structure I picked was a graph that I implemented by created a matrix array.  The matrix is created by having a set of arrays within an array, which effectively creates rows and columns. Visual example:

[[1,0,0],
 [1,1,1],
 [0,0,0]]

The only two values I used within the array are 1’s and 0’s.  The ones are living cells and the zeros are non living cells.  To implement the four rules of life on the matrix, I create a blank matrix that holds all false values to be filled in by the user or for presets to be mapped to.  Then when the game of life starts running, I create a second matrix array to hold the changes to the state of matrix of cells.  I then created a loop that runs through each cell of current matrix’s array of cells.  For each cell I check all of it’s neighbors and add up how many are alive.  Based on the number returned, I use the 4 rules to assign the same cell in the temporary (second) matrix to be living or dead.  When finished, I switch the current state to be the temporary’s values.

Example: 

[[0,0,0],                [[0,1,0],                 [[0,0,0],
 [1,1,1],      ==>     [0,1,0],     ==>      [1,1,1],
 [0,0,0]]                 [0,1,0]]                  [0,0,0]]


I created the game of life using JavaScript as purely a frontend application with React and React Hooks.  Using react and hooks presents an interesting challenge because unlike class based, the rendering of the web page doesn’t necessarily keep up with the changes to the state of the application.  So when running a function that gets called by a timer, I had to make sure those calls were within a useEffect hook that would force the browser to update the matrix of cells on the screen and the state of the matrix.

I created a custom hook to take care of this function, and all you would have to do is set the speed to start it and set the speed to null to stop it.

Example: 

import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}


One of the most fun features to implement was creating presets for the game of life.  There are a few ways to create presets, you can create an array by hand and hand fill out the values of the array so that some of them are 1’s instead of zeros.  The most interesting way to do it, is to create a blank array and using loops, add different values to the cells within the matrix array and then set that matrix to state. For example, if you wanted to make a cross in the matrix, all you need is two for loops that run the length of the matrix (height or width, it’s a square so it doesn’t matter), and make the middle cells (parseInt(length / 2)) to each of the cells in a specific row and the same for columns.  Example: 

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