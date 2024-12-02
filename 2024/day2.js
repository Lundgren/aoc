const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const solution1 = (input) => {
  const reports = input
    .split("\n")
    .map((row) => row.split(" ").map((num) => parseInt(num)));

  let ans = 0;
  for (const report of reports) {
    if (isSafe(report)) {
      ans++;
    }
  }

  return ans;
};

const solution2 = (input) => {
  const reports = input
    .split("\n")
    .map((row) => row.split(" ").map((num) => parseInt(num)));

  let ans = 0;
  for (const report of reports) {
    for (let i = 0; i < report.length; i++) {
      const dampenedReport = report.slice(0, i).concat(report.slice(i + 1));
      if (isSafe(dampenedReport)) {
        ans++;
        i = Infinity;
      }
    }
  }

  return ans;
};

function isSafe(report) {
  const allIncreasing = report.every(
    (num, i, arr) => i === 0 || num > arr[i - 1]
  );
  const allDecreasing = report.every(
    (num, i, arr) => i === 0 || num < arr[i - 1]
  );
  if (allIncreasing || allDecreasing) {
    const maxDiff = Math.max(
      ...report.map((num, i, arr) => (i > 0 ? Math.abs(num - arr[i - 1]) : 0))
    );
    const minDiff = Math.min(
      ...report.map((num, i, arr) =>
        i > 0 ? Math.abs(num - arr[i - 1]) : Infinity
      )
    );

    if (maxDiff <= 3 && minDiff >= 1) {
      return true;
    }
  }

  return false;
}

example("Part1", solution1, testInput, 2);
answer("Part1", solution1);

example("Part2", solution2, testInput, 4);
answer("Part2", solution2);
