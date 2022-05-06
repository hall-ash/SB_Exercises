import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true (on) / false (off)
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // returns true (on) or off (false) based on chanceLightStartsOn
    const determineLit = () => Boolean(Math.random() < chanceLightStartsOn);

    // create array-of-arrays of true/false values
    const initialBoard = Array.from({length: nrows}, row => {
      return Array.from({length: ncols}, cell => determineLit());
    });
    return initialBoard;
  }

  // won when all lights are off
  const hasWon = () => board.every(row => row.every(cell => cell === false));

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // in the copy, flip this cell and the cells around it
      const cellsToFlip = [
        [y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1], [y, x]
      ]
      cellsToFlip.forEach(([y, x]) => flipCell(y, x, boardCopy));
  
      // return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else make table board
  return (hasWon() ? <p>You've won the game!</p> :
    <table className="Board">
      <tbody>
      {
        board.map((row, y) => {
          return (
          <tr key={y}>
            {row.map((cell, x) => <Cell key={`${y}-${x}`} flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} isLit={cell} />)}
          </tr>);
        })
      }
      </tbody>
    </table>
  );
}

export default Board;
