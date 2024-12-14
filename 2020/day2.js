const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

const solution1 = (input) => {
  let ans = 0;
  input.split("\n").forEach((line) => {
    const [policy, password] = line.split(": ");
    const [range, char] = policy.split(" ");
    const [min, max] = range.split("-").map((n) => parseInt(n));
    const count = password.split("").filter((c) => c === char).length;
    if (count >= min && count <= max) {
      ans++;
    }
  });
  return ans;
};

const solution2 = (input) => {
  let ans = 0;
  input.split("\n").forEach((line) => {
    const [policy, password] = line.split(": ");
    const [range, char] = policy.split(" ");
    const [pos1, pos2] = range.split("-").map((n) => parseInt(n));
    const count =
      (password.split("")[pos1 - 1] === char ? 1 : 0) +
      (password.split("")[pos2 - 1] === char ? 1 : 0);
    if (count === 1) {
      ans++;
    }
  });
  return ans;
};

example("Part1", solution1, testInput, 2);
answer("Part1", solution1);

example("Part2", solution2, testInput, 1);
answer("Part2", solution2); // 456 = too high, 449 = too high
