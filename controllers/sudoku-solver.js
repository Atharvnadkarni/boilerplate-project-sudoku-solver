function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

const _ = require("lodash");

class SudokuSolver {
  coordsToRegs = {
    A1: 0,
    B1: 0,
    C1: 0,
    D1: 3,
    E1: 3,
    F1: 3,
    F1: 6,
    G1: 3,
    I1: 3,
    A2: 0,
    B2: 0,
    C2: 0,
    D2: 3,
    E2: 3,
    F2: 3,
    F2: 6,
    G2: 3,
    I2: 3,
    A3: 0,
    B3: 0,
    C3: 0,
    D3: 3,
    E3: 3,
    F3: 3,
    F3: 6,
    G3: 3,
    I3: 3,
    A4: 1,
    B4: 1,
    C4: 1,
    D4: 4,
    E4: 4,
    F4: 4,
    F4: 7,
    G4: 4,
    I4: 4,
    A5: 1,
    B5: 1,
    C5: 1,
    D5: 4,
    E5: 4,
    F5: 4,
    F5: 7,
    G5: 4,
    I5: 4,
    A6: 1,
    B6: 1,
    C6: 1,
    D6: 4,
    E6: 4,
    F6: 4,
    F6: 7,
    G6: 4,
    I6: 4,
    A7: 2,
    B7: 2,
    C7: 2,
    D7: 5,
    E7: 5,
    F7: 5,
    F7: 8,
    G7: 5,
    I7: 5,
    A8: 2,
    B8: 2,
    C8: 2,
    D8: 5,
    E8: 5,
    F8: 5,
    F8: 8,
    G8: 5,
    I8: 5,
    A9: 2,
    B9: 2,
    C9: 2,
    D9: 5,
    E9: 5,
    F9: 5,
    F9: 8,
    G9: 5,
    I9: 5,
  };
  validate(puzzleString) {
    return puzzleString.length === 81;
  }

  checkRowPlacement(board, row, column, value) {
    const rowIndex = row.toLowerCase().charCodeAt(0) - 97;
    for (let i = 0; i < 9; i++) {
      if (board[rowIndex][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(board, row, column, value) {
    const colIndex = column - 1;
    const puzzleString = board.flat(Infinity).join("");
    for (let i = 0; i < 81; i++) {
      if (i % 9 == colIndex) {
        if (puzzleString[i] == value) {
          return false;
        }
      }
    }
    return true;
  }

  checkRegionPlacement(board, row, column, value) {
    const rowIndex = row.toLowerCase().charCodeAt(0) - 97;
    const colIndex = column - 1;

    const rowsChecked = Math.floor(rowIndex / 3);
    const valsChecked = Math.floor(colIndex / 3);

    for (let i = rowsChecked * 3; i < rowsChecked * 3 + 3; i++) {
      for (let j = valsChecked * 3; j < valsChecked * 3 + 3; j++) {
        if (board[i][j] == value) {
          return false;
        }
      }
    }
    return true;
  }

  puzzleStringToRowArray(puzzleString) {
    let rowArray = [];
    for (let i = 0; i < 81; i += 9) {
      rowArray.push([
        puzzleString[i],
        puzzleString[i + 1],
        puzzleString[i + 2],
        puzzleString[i + 3],
        puzzleString[i + 4],
        puzzleString[i + 5],
        puzzleString[i + 6],
        puzzleString[i + 7],
        puzzleString[i + 8],
      ]);
    }
    return rowArray;
  }

  puzzleStringToRegArray(puzzleString) {
    let regArray = [];
    for (let i = 0; i < 72; i += i % 9 == 8 ? 27 : 3) {
      regArray.push([
        puzzleString[i],
        puzzleString[i + 1],
        puzzleString[i + 2],
        puzzleString[i + 9],
        puzzleString[i + 10],
        puzzleString[i + 11],
        puzzleString[i + 18],
        puzzleString[i + 19],
        puzzleString[i + 20],
      ]);
    }
    regArray = regArray.filter((item, index) => [0, 1, 2].includes(index % 9));
    return regArray;
  }

  puzzleStringIndexToCoords(index) {
    const rowIndex = Math.floor(index / 9);
    const rowLetter = String.fromCharCode(Math.floor(index / 9) + 97);
    const colIndex = (index % 9) + 1;
    return [rowLetter, colIndex];
  }

  valid(board, [row, col], num) {
    if (!this.checkRowPlacement(board, row, col, num)) {
      return false;
    }
    if (!this.checkColPlacement(board, row, col, num)) {
      return false;
    }
    if (!this.checkRegionPlacement(board, row, col, num)) {
      return false;
    }
    return true;
  }

  find_empty(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] == ".") {
          return [String.fromCharCode(i + 97).toUpperCase(), j + 1];
        }
      }
    }
    return null;
  }

  solveBoard(board) {
    let find = this.find_empty(board);
    if (find == null) {
      return true;
    }
    const [row, col] = find;
    const [rowIndex, colIndex] = [
      row.toLowerCase().charCodeAt(0) - 97,
      col - 1,
    ];
    for (let i = 1; i <= 9; i++) {
      if (this.valid(board, [row, col], i)) {
        board[rowIndex][colIndex] = i.toString();
        if (this.solveBoard(board)) {
          return true;
        }
        board[rowIndex][colIndex] = ".";
      }
    }
    return null;
  }
  solve(puzzleString) {
    const board = this.puzzleStringToRowArray(puzzleString);
    this.solveBoard(board);
    return board.flat(Infinity).join("");
  }
}

const solver = new SudokuSolver();
let obj =
  "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
obj = solver.solve(obj);
console.log(obj);

module.exports = SudokuSolver;
