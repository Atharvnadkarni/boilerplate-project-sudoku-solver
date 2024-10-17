/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

const tRegs = require("./t-regs");
const tRowCols = require("./t-row-cols");

const getRowsFromBoard = (board) => board;
const getColsFromBoard = (board) => {
  let columns = [];
  for (let i = 0; i < 9; i++) {
    columns.push(board.map((row) => row[i]));
  }
  return columns;
};
const getRegsFromBoard = (board) => {
  let regions = [];
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      regions.push([
        board[i + 0][j + 0],
        board[i + 0][j + 1],
        board[i + 0][j + 2],
        board[i + 1][j + 0],
        board[i + 1][j + 1],
        board[i + 1][j + 2],
        board[i + 2][j + 0],
        board[i + 2][j + 1],
        board[i + 2][j + 2],
      ]);
    }
  }
  return regions;
};

const fillInIfIsAcceptable = (board, rowIndex, colIndex, value) => {
  if (
    !getRowsFromBoard(board)[rowIndex].includes(value) &&
    !getColsFromBoard(board)[colIndex].includes(value) &&
    !getRegsFromBoard(board)[tRowCols[`${rowIndex}${colIndex}`]].includes(value)
  ) {
    console.log(getRegsFromBoard(board)[tRowCols[`${rowIndex}${colIndex}`]], value, rowIndex, colIndex)
    board[rowIndex][colIndex] = value;
    console.log(getRegsFromBoard(board)[tRowCols[`${rowIndex}${colIndex}`]], value, rowIndex, colIndex)
  }
};

const getMostInformaticRowIndex = (board) => {
  const rows = getRowsFromBoard(board);
  let mostInformatic = new Array(9).fill(".");
  let mostInformaticIndex = 99;
  rows.forEach((row, index) => {
    if (
      mostInformatic.filter((el) => el != ".").length <
        row.filter((el) => el != ".").length &&
      !rowFull(board, index)
    ) {
      mostInformatic = row;
      mostInformaticIndex = index;
    }
  });
  return { row: mostInformatic, index: mostInformaticIndex };
};

const getMostInformaticColIndex = (board) => {
  const cols = getColsFromBoard(board);
  let mostInformatic = new Array(9).fill(".");
  let mostInformaticIndex = 99;
  cols.forEach((col, index) => {
    if (
      mostInformatic.filter((el) => el != ".").length <
      col.filter((el) => el != ".").length &&
      !colFull(board, index)
    ) {
      mostInformatic = col;
      mostInformaticIndex = index;
    }
  });
  return { col: mostInformatic, index: mostInformaticIndex };
};


const getMostInformaticRegIndex = (board) => {
  const regs = getRegsFromBoard(board);
  let mostInformatic = new Array(9).fill(".");
  let mostInformaticIndex = 99;
  regs.forEach((reg, index) => {
    if (
      mostInformatic.filter((el) => el != ".").length <
      reg.filter((el) => el != ".").length &&
      !regFull(board, index)
    ) {
      mostInformatic = reg;
      mostInformaticIndex = index;
    }
  });
  return { reg: mostInformatic, index: mostInformaticIndex };
};

const fillInMostInformaticRow = (board) => {
  const { row, index: rowIndex } = getMostInformaticRowIndex(board);
  console.log(row)
  row.forEach((elem, i) => {
    if (elem == ".") {
      for (let j = 1; j <= 9; j++) {
        fillInIfIsAcceptable(board, rowIndex, i, j.toString());
      }
    }
  });
};

const fillInMostInformaticCol = (board) => {
  const { col, index: colIndex } = getMostInformaticColIndex(board);
  col.forEach((elem, i) => {
    if (elem == ".") {
      for (let j = 1; j <= 9; j++) {
        fillInIfIsAcceptable(board, i, colIndex, j.toString());
      }
    }
  })
};

const fillInMostInformaticReg = (board) => {
  const { reg, index: regIndex } = getMostInformaticRegIndex(board);
  reg.forEach((elem, i) => {
    const [rowIndex, colIndex] = tRegs[`${regIndex}${i}`].split('')
    if (elem == ".") {
      for (let j = 1; j <= 9; j++) {
        fillInIfIsAcceptable(board, rowIndex, colIndex, j.toString());
      }
    }
  })
};

const boardFull = (board) => {
  let numEmpties = 0;
  for (const row of board) {
    for (const elem of row) {
      if (elem == ".") numEmpties++;
    }
  }
  return numEmpties == 0;
};

const rowFull = (board, rowIndex) => {
  let numEmpties = 0;
  for (const elem of board[rowIndex]) {
    if (elem == ".") numEmpties++;
  }
  return numEmpties == 0;
};

const colFull = (board, colIndex) => {
  let numEmpties = 0;
  for (const elem of getColsFromBoard(board)[colIndex]) {
    if (elem == ".") numEmpties++;
  }
  return numEmpties == 0;
};

const regFull = (board, regIndex) => {
  let numEmpties = 0;
  for (const elem of getRegsFromBoard(board)[regIndex]) {
    if (elem == ".") numEmpties++;
  }
  return numEmpties == 0;
};

var solveSudoku = function (board) {
    fillInMostInformaticRow(board);
    fillInMostInformaticReg(board);
    fillInMostInformaticCol(board);
    fillInMostInformaticReg(board);
};

let board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log(getRegsFromBoard(board))
console.log(board.map((elem) => elem.join("")).join(""));
solveSudoku(board);

regionValues = {
  A1: 0,
  B1: 0,
  C1: 0,
  D1: 4,
  E1: 4,
  F1: 4,
  G1: 7,
  H1: 7,
  I1: 7,
  A2: 0,
  B2: 0,
  C2: 0,
  D2: 4,
  E2: 4,
  F2: 4,
  G2: 7,
  H2: 7,
  I2: 7,
  A3: 0,
  B3: 0,
  C3: 0,
  D3: 4,
  E3: 4,
  F3: 4,
  G3: 7,
  H3: 7,
  I3: 7,
  A4: 1,
  B4: 1,
  C4: 1,
  D4: 5,
  E4: 5,
  F4: 5,
  G4: 8,
  H4: 8,
  I4: 8,
  A5: 1,
  B5: 1,
  C5: 1,
  D5: 5,
  E5: 5,
  F5: 5,
  G5: 8,
  H5: 8,
  I5: 8,
  A6: 1,
  B6: 1,
  C6: 1,
  D6: 5,
  E6: 5,
  F6: 5,
  G6: 8,
  H6: 8,
  I6: 8,
  A7: 2,
  B7: 1,
  C7: 1,
  D7: 6,
  E7: 6,
  F7: 6,
  G7: 9,
  H7: 9,
  I7: 9,
  A8: 2,
  B8: 1,
  C8: 1,
  D8: 6,
  E8: 6,
  F8: 6,
  G8: 9,
  H8: 9,
  I8: 9,
  A9: 2,
  B9: 1,
  C9: 1,
  D9: 6,
  E9: 6,
  F9: 6,
  G9: 9,
  H9: 9,
  I9: 9,
};
