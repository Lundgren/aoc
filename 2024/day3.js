const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const testInput2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const solution1 = (input) => {
  let ans = 0;

  const regex = /mul\((\d+),(\d+)\)/g;
  let match;

  while ((match = regex.exec(input)) !== null) {
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    ans += x * y;
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  while (input.indexOf("don't()") !== -1) {
    const dontIdx = input.indexOf("don't()");
    const doIdx = input.indexOf("do()", dontIdx);
    if (doIdx === -1) {
      input = input.slice(0, dontIdx);
    } else {
      input = input.slice(0, dontIdx) + input.slice(doIdx + 4);
    }
  }

  const regex = /mul\((\d+),(\d+)\)/g;
  let match;

  while ((match = regex.exec(input)) !== null) {
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    ans += x * y;
  }

  return ans;
};

example("Part1", solution1, testInput, 161);
answer("Part1", solution1);

example("Part2", solution2, testInput2, 48);
answer("Part2", solution2);
