const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const isNumber = (str) => {
  return !isNaN(parseInt(str));
};

const findWholeNumber = (board, r, c) => {
  let row = board.getRow(r);

  let start = c;
  while (start > 0 && isNumber(row[start - 1])) {
    start--;
  }
  let end = c;
  while (end < row.length - 1 && isNumber(row[end + 1])) {
    end++;
  }

  return {
    val: parseInt(row.substring(start, end + 1)),
    row: r,
    col: start,
  };
};

const solution1 = (input) => {
  const board = new Board(input);

  const foundNumbers = {};
  board.forEach((cell, r, c) => {
    if (cell != "." && !isNumber(cell)) {
      board.getNeighbors(r, c).forEach((neighbor) => {
        if (isNumber(neighbor.cell)) {
          const num = findWholeNumber(board, neighbor.row, neighbor.col);
          const id = `${num.row}, ${num.col}`;
          foundNumbers[id] = num;
        }
      });
    }
  });
  return Object.values(foundNumbers)
    .map((num) => num.val)
    .reduce((prev, curr) => prev + curr, 0);
};

const solution2 = (input) => {
  const board = new Board(input);

  const foundGears = [];
  board.forEach((cell, r, c) => {
    if (cell === "*") {
      const foundNeighbors = {};
      board.getNeighbors(r, c).forEach((neighbor) => {
        if (isNumber(neighbor.cell)) {
          const num = findWholeNumber(board, neighbor.row, neighbor.col);
          const id = `${num.row}, ${num.col} => ${num.val}`;
          foundNeighbors[id] = num;
        }
      });

      if (Object.keys(foundNeighbors).length === 2) {
        const ratio1 = foundNeighbors[Object.keys(foundNeighbors)[0]].val;
        const ratio2 = foundNeighbors[Object.keys(foundNeighbors)[1]].val;

        foundGears.push(ratio1 * ratio2);
      }
    }
  });

  return foundGears.reduce((prev, curr) => prev + curr, 0);
};

example("Part1", solution1, testInput, 4361);
answer("Part1", solution1);

example("Part2", solution2, testInput, 467835);
answer("Part2", solution2);
