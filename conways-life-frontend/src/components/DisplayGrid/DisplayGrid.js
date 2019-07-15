import React, {useState, useEffect} from 'react';

import './DisplayGrid.scss'

function DisplayGrid({grid, setGrid}) {

    return (
        <div className="DisplayGrid--container">
            {/* loop over grid to make rows */}
            {/* loop over grid to make columns */}
                {/* make div cells */}
                {/* add click handlers to each div cell */}
            {
                grid.map(row => {
                    return (
                        <div className="DisplayGrid--row">
                            {row.map( col => {
                                console.log("col: ", col)
                                return (<div className={`DisplayGrid--column ${col === 1 ? "living" : ""}`}></div>);
                            })}
                        </div>
                    )
                })
            }

            {/* <div className="DisplayGrid--row">
                <div className="DisplayGrid--column living"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
                <div className="DisplayGrid--column"></div>
            </div> */}
        </div>
    );
}

export default DisplayGrid;