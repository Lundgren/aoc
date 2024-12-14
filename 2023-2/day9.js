const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const isZeros = (arr) => arr.filter((n) => n !== 0).length === 0;

const solution1 = (input) => {
  const histories = input.split("\n").map((r) => r.split(" ").map(Number));

  let total = 0;
  for (const history of histories) {
    const diffs = [history];
    let lastDiffs = diffs[diffs.length - 1];
    while (!isZeros(lastDiffs)) {
      let diff = [];

      for (let i = 0; i < lastDiffs.length - 1; i++) {
        diff.push(lastDiffs[i + 1] - lastDiffs[i]);
      }

      diffs.push(diff);
      lastDiffs = diffs[diffs.length - 1];
    }

    let extrapolated = 0;
    for (let i = diffs.length - 1; i >= 0; i--) {
      const diff = diffs[i];
      extrapolated += diff[diff.length - 1];
    }
    total += extrapolated;
  }

  return total;
};

const solution2 = (input) => {
  const histories = input.split("\n").map((r) => r.split(" ").map(Number));

  let total = 0;
  for (const history of histories) {
    const diffs = [history];
    let lastDiffs = diffs[diffs.length - 1];
    while (!isZeros(lastDiffs)) {
      let diff = [];

      for (let i = 0; i < lastDiffs.length - 1; i++) {
        diff.push(lastDiffs[i + 1] - lastDiffs[i]);
      }

      diffs.push(diff);
      lastDiffs = diffs[diffs.length - 1];
    }

    let extrapolated = 0;
    for (let i = diffs.length - 1; i >= 0; i--) {
      const diff = diffs[i];
      extrapolated = diff[0] - extrapolated;
    }
    total += extrapolated;
  }

  return total;
};

example("Part1", solution1, testInput, 114);
answer("Part1", solution1);

example("Part2", solution2, testInput, 2);
answer("Part2", solution2);
