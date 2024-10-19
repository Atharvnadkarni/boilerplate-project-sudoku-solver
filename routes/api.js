"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  const detectUndeChars = (str) => {
    let chars = [];
    const getUniqueChars = () => {
      for (const char of str) {
        if (!chars.includes(char)) {
          chars.push(char);
        }
      }
    };
    getUniqueChars(str);
    chars = chars.sort();
    chars.shift();
    return (
      chars
        .sort()
        .join("")
        .match(/\b[123456789]*\b/) != ""
    );
  };
  const getCoordinateInPuzzleStr = (puzzle, row, column) => {
    const rowIndex = row.toLowerCase().charCodeAt(0) - 97;

    const colIndex = column - 1;
    return rowIndex * 9 + colIndex;
  };
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || !value) {
      return res.status(400).json({ error: "Required field(s) missing" });
    }
    if (!detectUndeChars(puzzle)) {
      return res.status(400).json({ error: "Invalid characters in puzzle" });
    }
    if (puzzle.length !== 81) {
      return res
        .status(400)
        .json({ error: "Expected puzzle to be 81 characters long" });
    }
    const [row, column] = coordinate.split("");
    if (
      row.toLowerCase().charCodeAt(0) > 105 ||
      row.toLowerCase().charCodeAt(0) < 97
    ) {
      return res.status(400).json({ error: "Invalid coordinate" });
    }
    if (value < 1 || value > 9) {
      return res.status(400).json({ error: "Invalid value" });
    }
    const puzzleIdx = getCoordinateInPuzzleStr(puzzle, row, column);
    console.log(puzzleIdx);
    if (puzzle[puzzleIdx] == value) {
      return res.status(200).json({ valid: true });
    }
    const board = solver.puzzleStringToRowArray(puzzle);
    if (
      solver.checkRowPlacement(board, row, column, value) &&
      solver.checkColPlacement(board, row, column, value) &&
      solver.checkRegionPlacement(board, row, column, value)
    ) {
      return res.status(200).json({ valid: true });
    }
    let conflict = [];
    if (!solver.checkRowPlacement(board, row, column, value)) {
      conflict.push("row");
    }
    if (!solver.checkColPlacement(board, row, column, value)) {
      conflict.push("column");
    }
    if (!solver.checkRegionPlacement(board, row, column, value)) {
      conflict.push("region");
    }
    return res.status(200).json({ valid: false, conflict });
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;
    if (!puzzle) {
      return res.status(400).json({ error: "Required field missing" });
    }
    if (!detectUndeChars(puzzle)) {
      return res.status(400).json({ error: "Invalid characters in puzzle" });
    }
    if (!solver.validate(puzzle)) {
      return res
        .status(400)
        .json({ error: "Expected puzzle to be 81 characters long" });
    }
    if (solver.solve(puzzle) == puzzle) {
      return res.status(400).json({ error: "Puzzle cannot be solved" });
    }
    return res.status(200).json({ solution: solver.solve(puzzle) });
  });
};
