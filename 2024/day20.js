const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

const solution1 = (input) => {
  let ans = 0;

  const board = new Board(input);
  const [startY, startX] = board.find("S");
  const costMap = board.costMap(startY, startX);

  for (const [coord1, dist1] of Object.entries(costMap)) {
    const [y, x] = coord1.split(",").map(Number);

    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const manhattan = Math.abs(dy) + Math.abs(dx);
        if (manhattan == 2) {
          const yy = y + dy;
          const xx = x + dx;
          const coord2 = `${yy},${xx}`;

          if (coord2 in costMap) {
            const dist2 = costMap[coord2];
            if (dist1 > dist2) {
              if (dist1 - dist2 - manhattan >= 100) {
                ans++;
              }
            }
          }
        }
      }
    }
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  const board = new Board(input);
  const [startY, startX] = board.find("S");
  const costMap = board.costMap(startY, startX);

  for (const [coord1, dist1] of Object.entries(costMap)) {
    const [y, x] = coord1.split(",").map(Number);

    for (let dy = -20; dy <= 20; dy++) {
      for (let dx = -20; dx <= 20; dx++) {
        const manhattan = Math.abs(dy) + Math.abs(dx);
        if (manhattan <= 20) {
          const yy = y + dy;
          const xx = x + dx;
          const coord2 = `${yy},${xx}`;

          if (coord2 in costMap) {
            const dist2 = costMap[coord2];
            if (dist1 > dist2) {
              if (dist1 - dist2 - manhattan >= 100) {
                ans++;
              }
            }
          }
        }
      }
    }
  }

  return ans;
};

example("Part1", solution1, testInput, 84);
answer("Part1", solution1);

example("Part2", solution2, testInput, 10);
answer("Part2", solution2);
