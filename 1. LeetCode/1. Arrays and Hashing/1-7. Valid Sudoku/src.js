/**
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = function (board) {
  const validator = new SodukuValidator(board);

  try {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (!validator.checkCurValue(y, x)) {
          continue;
        }
        validator.validateColumn(y, x);
        validator.validateRow(y, x);
        validator.validateBox(y, x);
      }
    }

  } catch {
    return false;
  }
  return true;
};

class SodukuValidator {
  board = null;
  rowSet = [...Array(9)].map(() => new Set());
  columnSet = [...Array(9)].map(() => new Set());
  boxSet = [
    [new Set(), new Set(), new Set()],
    [new Set(), new Set(), new Set()],
    [new Set(), new Set(), new Set()],
  ];

  constructor(board) {
    this.board = board;
  }

  checkCurValue(y, x) {
    let cur = this.board[y][x];
    if (cur === ".") {
      return false;
    }
    cur = Number(cur);
    if (cur > 9 || cur < 1) {
      throw new Error();
    }
    return true;
  }

  validateColumn(y, x) {
    const cur = this.board[y][x];
    const column = this.columnSet[x];
    if (column.has(cur)) {
      throw new Error();
    }
    column.add(cur);
  }

  validateRow(y, x) {
    const cur = this.board[y][x];
    const row = this.rowSet[y];
    if (row.has(cur)) {
      throw new Error();
    }
    row.add(cur);
  }

  validateBox(y, x) {
    const cur = this.board[y][x];
    const box = this.boxSet[Math.floor(y / 3)][Math.floor(x / 3)];
    if (box.has(cur)) {
      throw new Error();
    }
    box.add(cur);
  }
}

const board = [["8", "3", ".", ".", "7", ".", ".", ".", "."]
  , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
  , [".", "9", "8", ".", ".", ".", ".", "6", "."]
  , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
  , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
  , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
  , [".", "6", ".", ".", ".", ".", "2", "8", "."]
  , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
  , [".", ".", ".", ".", "8", ".", ".", "7", "9"]]


const result = isValidSudoku(board);

console.log(result);

