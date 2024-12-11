const { example, answer, inputStr } = require("../utils/helper.js");
const { memoize } = require("../utils/memoize.js");

const testInput = `125 17`;

const solution1 = (input) => {
  const stones = input.split(" ").map((n) => parseInt(n));
  return stones.map((s) => count(s, 25)).reduce((a, b) => a + b, 0);
};

const solution2 = (input) => {
  const stones = input.split(" ").map((n) => parseInt(n));
  return stones.map((s) => count(s, 75)).reduce((a, b) => a + b, 0);
};

const count = memoize((stone, steps) => {
  if (steps == 0) {
    return 1;
  }

  if (stone === 0) {
    return count(1, steps - 1);
  }
  if (stone.toString().length % 2 == 0) {
    const s = stone.toString();
    const p1 = parseInt(s.slice(0, s.length / 2));
    const p2 = parseInt(s.slice(s.length / 2));
    return count(p1, steps - 1) + count(p2, steps - 1);
  }

  return count(stone * 2024, steps - 1);
});

example("Part1", solution1, testInput, 55312);
answer("Part1", solution1);

answer("Part2", solution2);
