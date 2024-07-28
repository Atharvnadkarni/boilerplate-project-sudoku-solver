class SudokuSolver {

  validate(puzzleString) {
    if (!puzzleString.length == 81) throw Error
    if (puzzleString.match(/[^1-9]/g) && puzzleString.match(/[^.]/g)) throw Error
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

