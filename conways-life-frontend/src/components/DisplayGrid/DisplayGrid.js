import React, { useState, useEffect } from 'react';

import './DisplayGrid.scss'

function DisplayGrid({ grid, setGrid, changeCell }) {


    return (
        <div className="DisplayGrid--container">
            {
                grid.map((row, rowIndex) => {
                    return (
                        <div className="DisplayGrid--row" key={`${rowIndex}`}>
                            {row.map((col, colIndex) => {
                                return (<div
                                    onClick={(e) => changeCell(e)}
                                    className={`DisplayGrid--column ${col === 1 ? "living" : ""}`}
                                    data-col={`${colIndex}`}
                                    data-row={`${rowIndex}`}
                                    key={`${colIndex}${rowIndex}`}>
                                </div>);
                            })}
                        </div>
                    )
                })
            }
        </div>
    );
}



export default DisplayGrid;