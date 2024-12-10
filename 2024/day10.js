const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const testInput2 = `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;

const testInput3 = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;

const testInput4 = `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`;

const testInput5 = `.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`;

const testInput6 = `012345
123456
234567
345678
4.6789
56789.`;

const solution1 = (input) => {
  let ans = 0;

  const board = new Board(input);
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      if (parseInt(board.get(r, c)) === 0) {
        const trails = findTrailHeads(board, [r, c], true, [`${r},${c}`]);

        ans += trails.size;
      }
    }
  }

  return ans;
};

function solution2(input) {
  let ans = 0;

  const board = new Board(input);
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      if (parseInt(board.get(r, c)) === 0) {
        const trails = findTrailHeads(board, [r, c], false, [`${r},${c}`]);

        ans += trails.size;
      }
    }
  }

  return ans;
}

function findTrailHeads(board, start, part1, path = []) {
  const [row, col] = start;

  const currentValue = parseInt(board.get(row, col));
  if (currentValue === 9) {
    if (part1) {
      return new Set([`${row},${col}`]);
    } else {
      return new Set([path.join(",")]);
    }
  }

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const paths = new Set();

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    const newPos = `${newRow},${newCol}`;
    const nextValue = parseInt(board.get(newRow, newCol));

    if (nextValue === currentValue + 1) {
      path.push(newPos);

      const newPaths = findTrailHeads(board, [newRow, newCol], part1, path);

      for (const p of newPaths) {
        paths.add(p);
      }

      path.pop();
    }
  }

  return paths;
}

example("Part1", solution1, testInput, 36);
example("Part1", solution1, testInput2, 2);
example("Part1", solution1, testInput3, 4);
example("Part1", solution1, testInput4, 3);
answer("Part1", solution1);

example("Part2", solution2, testInput, 81);
example("Part2", solution2, testInput5, 3);
example("Part2", solution2, testInput3, 13);
example("Part2", solution2, testInput6, 227);
answer("Part2", solution2);
