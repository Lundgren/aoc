const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `1721
979
366
299
675
1456`;

const solution1 = (input) => {
  const nums = input.split("\n").map((n) => parseInt(n));

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === 2020) {
        return nums[i] * nums[j];
      }
    }
  }
  return 0;
};

const solution2 = (input) => {
  const nums = input.split("\n").map((n) => parseInt(n));

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = i + 2; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 2020) {
          return nums[i] * nums[j] * nums[k];
        }
      }
    }
  }
  return 0;
};

example("Part1", solution1, testInput, 514579);
answer("Part1", solution1);

example("Part2", solution2, testInput, 241861950);
answer("Part2", solution2);
