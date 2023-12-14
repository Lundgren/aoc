const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const isEmptyRow = (image, row) => image[row].indexOf("#") === -1;

const isEmptyCol = (image, col) => {
  for (let r = 0; r < image.length; r++) {
    if (image[r][col] === "#") {
      return false;
    }
  }
  return true;
};

const calculateDistance = (image, expand) => {
  const galaxies = [];
  let emptyLines = 0;
  for (let r = 0; r < image.length; r++) {
    if (isEmptyRow(image, r)) {
      emptyLines++;
      continue;
    }

    let emptyCols = 0;
    for (let c = 0; c < image[r].length; c++) {
      if (isEmptyCol(image, c)) {
        emptyCols++;
        continue;
      }

      if (image[r][c] === "#") {
        galaxies.push({
          x: r + emptyLines * expand,
          y: c + emptyCols * expand,
        });
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      sum +=
        Math.abs(galaxies[i].x - galaxies[j].x) +
        Math.abs(galaxies[i].y - galaxies[j].y);
    }
  }

  return sum;
};

const solution1 = (input) => {
  const image = input.split("\n");
  return calculateDistance(image, 1);
};

const solution2 = (input) => {
  const image = input.split("\n");
  return calculateDistance(image, 999999);
};

example("Part1", solution1, testInput, 374);
answer("Part1", solution1);

// example("Part2", solution2, testInput, 8410);
answer("Part2", solution2);
