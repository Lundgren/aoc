const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const solution1 = (input) => {
  const board = new Board(input);
  const antinodes = new Set();

  for (let r = 0; r < board.width; r++) {
    for (let c = 0; c < board.height; c++) {
      const cell = board.get(r, c);

      if (cell != ".") {
        for (let rr = 0; rr < board.width; rr++) {
          for (let cc = 0; cc < board.height; cc++) {
            const other = board.get(rr, cc);

            if (other == cell && (r !== rr || c !== cc)) {
              const dr = rr - r;
              const dc = cc - c;
              const antinodeR = rr + dr;
              const antinodeC = cc + dc;
              if (isInBoard(board, antinodeR, antinodeC)) {
                antinodes.add(`${antinodeR},${antinodeC}`);
              }
            }
          }
        }
      }
    }
  }

  return antinodes.size;
};

const solution2 = (input) => {
  const board = new Board(input);
  const antinodes = new Set();

  for (let r = 0; r < board.width; r++) {
    for (let c = 0; c < board.height; c++) {
      const cell = board.get(r, c);
      if (cell != ".") {
        antinodes.add(`${r},${c}`);

        for (let rr = 0; rr < board.width; rr++) {
          for (let cc = 0; cc < board.height; cc++) {
            const other = board.get(rr, cc);

            if (other == cell && (r !== rr || c !== cc)) {
              const dr = rr - r;
              const dc = cc - c;
              let antinodeR = rr + dr;
              let antinodeC = cc + dc;
              while (isInBoard(board, antinodeR, antinodeC)) {
                antinodes.add(`${antinodeR},${antinodeC}`);
                antinodeR += dr;
                antinodeC += dc;
              }
            }
          }
        }
      }
    }
  }

  return antinodes.size;
};

function isInBoard(board, r, c) {
  return r >= 0 && r < board.width && c >= 0 && c < board.height;
}

example("Part1", solution1, testInput, 14);
answer("Part1", solution1);

example("Part2", solution2, testInput, 34);
answer("Part2", solution2);
