const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `AAAA
BBCD
BBCC
EEEC`;

const ss = `
BBBBBBCCCDDD
BBBBBBCCCDDD
BBBBBBCCCDDD
BBBBBBCCCCCC
BBBBBBCCCCCC
BBBBBBCCCCCC
EEEEEEEEECCC
EEEEEEEEECCC
EEEEEEEEECCC`;

const testInput2 = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

const testInput3 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

const testInput4 = `AAAA
BBCD
BBCC
EEEC`;

const testInput5 = `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`;

const solution1 = (input) => {
  let ans = 0;

  const board = new Board(input);
  const visited = new Set();

  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      if (!visited.has(`${r},${c}`)) {
        const region = findRegion(board, r, c, visited);
        const area = region.length;
        const perimeter = getPerimeter(board, region);
        ans += area * perimeter;
      }
    }
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  // Expand the board by 3x3 to avoid edge cases (aka multiple corners per letter)
  input = input
    .split("\n")
    .map((line) =>
      line
        .split("")
        .map((char) => char.repeat(3))
        .join("")
    )
    .join("\n")
    .split("\n")
    .map((line) => [line, line, line])
    .flat()
    .join("\n");

  console.log(input);

  const board = new Board(input);
  const visited = new Set();

  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      if (!visited.has(`${r},${c}`)) {
        const region = findRegion(board, r, c, visited);
        const area = region.length / 9; // Divide by 9 to account for the 3x3 expansion
        const corners = countCorners(board, region);
        ans += area * corners;
      }
    }
  }

  return ans;
};

const findRegion = (board, r, c, visited) => {
  const letter = board.get(r, c);
  const region = [];
  const queue = [[r, c]];

  while (queue.length > 0) {
    const [row, col] = queue.shift();
    const key = `${row},${col}`;

    if (
      visited.has(key) ||
      !board.isInside(row, col) ||
      board.get(row, col) !== letter
    ) {
      continue;
    }

    visited.add(key);
    region.push([row, col]);

    queue.push([row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]);
  }

  return region;
};

const getPerimeter = (board, region) => {
  let perimeter = 0;

  for (const [r, c] of region) {
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ].forEach(([dr, dc]) => {
      const newR = r + dr;
      const newC = c + dc;

      if (board.get(r, c) !== board.get(newR, newC)) {
        perimeter++;
      }
    });
  }

  return perimeter;
};

const countCorners = (board, region) => {
  let corners = 0;
  for (const [r, c] of region) {
    const val = board.get(r, c);

    // Outer corners
    if (board.get(r + 1, c) != val && board.get(r, c + 1) !== val) {
      corners++;
    } else if (board.get(r - 1, c) != val && board.get(r, c - 1) !== val) {
      corners++;
    } else if (board.get(r + 1, c) != val && board.get(r, c - 1) !== val) {
      corners++;
    } else if (board.get(r - 1, c) != val && board.get(r, c + 1) !== val) {
      corners++;
    }

    // Inner corners
    if (
      board.get(r + 1, c) === val &&
      board.get(r, c + 1) === val &&
      board.get(r + 1, c + 1) !== val
    ) {
      corners++;
    } else if (
      board.get(r - 1, c) === val &&
      board.get(r, c - 1) === val &&
      board.get(r - 1, c - 1) !== val
    ) {
      corners++;
    } else if (
      board.get(r + 1, c) === val &&
      board.get(r, c - 1) === val &&
      board.get(r + 1, c - 1) !== val
    ) {
      corners++;
    } else if (
      board.get(r - 1, c) === val &&
      board.get(r, c + 1) === val &&
      board.get(r - 1, c + 1) !== val
    ) {
      corners++;
    }
  }

  return corners;
};

example("Part1", solution1, testInput, 140);
example("Part1", solution1, testInput2, 772);
example("Part1", solution1, testInput3, 1930);
answer("Part1", solution1);

example("Part2", solution2, testInput, 80);
example("Part2", solution2, testInput2, 436);
example("Part2", solution2, testInput3, 1206);
example("Part2", solution2, testInput4, 236);
example("Part2", solution2, testInput5, 368);
answer("Part2", solution2);
