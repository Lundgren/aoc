const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const testInput2 = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;

const solution1 = (input) => {
  let ans = 0;

  const board = new Board(input);

  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      if (board.get(r, c) === "X") {
        if (
          board.get(r, c + 1) === "M" &&
          board.get(r, c + 2) === "A" &&
          board.get(r, c + 3) === "S"
        ) {
          ans++;
        }
        if (
          board.get(r, c - 1) === "M" &&
          board.get(r, c - 2) === "A" &&
          board.get(r, c - 3) === "S"
        ) {
          ans++;
        }
        if (
          board.get(r + 1, c) === "M" &&
          board.get(r + 2, c) === "A" &&
          board.get(r + 3, c) === "S"
        ) {
          ans++;
        }
        if (
          board.get(r - 1, c) === "M" &&
          board.get(r - 2, c) === "A" &&
          board.get(r - 3, c) === "S"
        ) {
          ans++;
        }
        if (
          board.get(r + 1, c + 1) === "M" &&
          board.get(r + 2, c + 2) === "A" &&
          board.get(r + 3, c + 3) === "S"
        ) {
          ans++;
        }
        if (
          board.get(r - 1, c + 1) === "M" &&
          board.get(r - 2, c + 2) === "A" &&
          board.get(r - 3, c + 3) === "S"
        ) {
          ans++;
        }
        if (
          board.get(r + 1, c - 1) === "M" &&
          board.get(r + 2, c - 2) === "A" &&
          board.get(r + 3, c - 3) === "S"
        ) {
          ans++;
        }
        if (
          board.get(r - 1, c - 1) === "M" &&
          board.get(r - 2, c - 2) === "A" &&
          board.get(r - 3, c - 3) === "S"
        ) {
          ans++;
        }
      }
    }
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  const board = new Board(input);

  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      const topLeftToBottomRight =
        board.get(r, c) === "M" &&
        board.get(r + 1, c + 1) === "A" &&
        board.get(r + 2, c + 2) === "S";
      const topRightToBottomLeft =
        board.get(r, c + 2) === "M" &&
        board.get(r + 1, c + 2 - 1) === "A" &&
        board.get(r + 2, c + 2 - 2) === "S";
      const bottomLeftToTopRight =
        board.get(r + 2, c) === "M" &&
        board.get(r + 2 - 1, c + 1) === "A" &&
        board.get(r + 2 - 2, c + 2) === "S";
      const bottomRightToTopLeft =
        board.get(r + 2, c + 2) === "M" &&
        board.get(r + 2 - 1, c + 2 - 1) === "A" &&
        board.get(r + 2 - 2, c + 2 - 2) === "S";
      if (topLeftToBottomRight && topRightToBottomLeft) {
        ans++;
      }
      if (topLeftToBottomRight && bottomLeftToTopRight) {
        ans++;
      }
      if (bottomRightToTopLeft && topRightToBottomLeft) {
        ans++;
      }
      if (bottomRightToTopLeft && bottomLeftToTopRight) {
        ans++;
      }
    }
  }

  return ans;
};

example("Part1", solution1, testInput, 18);
answer("Part1", solution1);

example("Part2", solution2, testInput2, 9);
answer("Part2", solution2);
