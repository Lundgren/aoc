const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const solution1 = (input) => {
  let ans = 0;
  const board = new Board(input);

  let [r, c] = getStart(board);
  let direction = 0;

  let inside = true;
  while (inside) {
    const dir = DIRECTIONS[direction];
    const next = board.get(r + dir[0], c + dir[1]);

    if (next === "#") {
      direction += 1;
      if (direction === 4) {
        direction = 0;
      }
    } else if (next === undefined) {
      inside = false;
    } else {
      r += dir[0];
      c += dir[1];
      ans++;
    }
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;
  const board = new Board(input);

  let [r, c] = getStart(board);

  for (let rr = 0; rr < board.height; rr++) {
    for (let cc = 0; cc < board.width; cc++) {
      if (board.get(rr, cc) !== ".") {
        continue;
      }

      board.set(rr, cc, "#");
      if (isLoop(board, r, c)) {
        ans++;
      }
      board.set(rr, cc, ".");
    }
  }

  return ans;
};

function getStart(board) {
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      if (board.get(r, c) === "^") {
        return [r, c];
      }
    }
  }
  throw new Error("No start found");
}

function isLoop(board, r, c) {
  let direction = 0;

  const visited = new Set();
  let i = 0;
  while (true) {
    i++;
    const posAndDir = `${r},${c},${direction}`;
    if (visited.has(posAndDir)) {
      return true;
    }
    visited.add(posAndDir);

    const dir = DIRECTIONS[direction];
    const next = board.get(r + dir[0], c + dir[1]);

    if (next === "#") {
      direction += 1;
      if (direction === 4) {
        direction = 0;
      }
    } else if (next === undefined) {
      return false;
    } else {
      r += dir[0];
      c += dir[1];
    }
  }
}

example("Part1", solution1, testInput, 41);
answer("Part1", solution1);

example("Part2", solution2, testInput, 6);
answer("Part2", solution2);
