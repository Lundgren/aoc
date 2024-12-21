const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

const solution1 = (input) => {
  const coords = input.split("\n").map((l) => l.split(",").map(Number));
  const size = coords.length > 100 ? 71 : 7;
  const take = coords.length > 100 ? 1024 : 12;

  const empty = Array(size)
    .fill(".")
    .map(() => Array(size).fill("."));
  const board = new Board(empty);
  board.set(size - 1, size - 1, "E");

  coords.forEach((coord, i) => {
    if (i < take) {
      board.set(coord[1], coord[0], "#");
    }
  });

  return walk(board);
};

const solution2 = (input) => {
  const coords = input.split("\n").map((l) => l.split(",").map(Number));
  const size = coords.length > 100 ? 71 : 7;
  const take = coords.length > 100 ? 1024 : 12;

  const empty = Array(size)
    .fill(".")
    .map(() => Array(size).fill("."));
  const board = new Board(empty);
  board.set(size - 1, size - 1, "E");

  coords.forEach((coord, i) => {
    if (i < take) {
      board.set(coord[1], coord[0], "#");
    }
  });

  for (let i = 0; i < coords.length; i++) {
    board.set(coords[i][1], coords[i][0], "#");
    if (i > take) {
      if (walk(board) === -1) {
        return `${coords[i][0]},${coords[i][1]}`;
      }
    }
  }
};

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function walk(board) {
  const pq = [[0, 0, 0]];
  const seen = new Set();

  while (pq.length > 0) {
    const [x, y, steps] = pq.shift();
    const key = `${x},${y}`;

    if (seen.has(key)) {
      continue;
    }
    seen.add(key);

    if (board.get(y, x) === "E") {
      return steps;
    }

    for (const [dx, dy] of dirs) {
      const xx = x + dx;
      const yy = y + dy;

      if (board.get(yy, xx) !== "#" && board.get(yy, xx) !== undefined) {
        pq.push([xx, yy, steps + 1]);
      }
    }

    // Prioritize the "Priority Queue"
    pq.sort((a, b) => a[2] - b[2]);
  }

  return -1;
}

example("Part1", solution1, testInput, 22);
answer("Part1", solution1);

example("Part2", solution2, testInput, "6,1");
answer("Part2", solution2);
