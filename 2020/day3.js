const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

const solution1 = (input) => {
  let board = new Board(input);
  let r = 0,
    c = 0;

  let trees = 0;
  while (r < board.height - 1) {
    r += 1;
    c = (c + 3) % board.width;
    if (board.get(r, c) === "#") {
      trees++;
    }
  }

  return trees;
};

const solution2 = (input) => {
  let board = new Board(input);
  const moves = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  let rounds = [];
  for (const [right, down] of moves) {
    let r = 0,
      c = 0;

    let trees = 0;
    while (r < board.height - 1) {
      r += down;
      c = (c + right) % board.width;
      if (board.get(r, c) === "#") {
        trees++;
      }
    }

    rounds.push(trees);
  }

  return rounds.reduce((prev, curr) => prev * curr, 1);
};

example("Part1", solution1, testInput, 7);
answer("Part1", solution1);

example("Part2", solution2, testInput, 336);
answer("Part2", solution2);
