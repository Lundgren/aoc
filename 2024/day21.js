const { example, answer, inputStr } = require("../utils/helper.js");
const { memoize } = require("../utils/memoize.js");

const testInput = `029A
980A
179A
456A
379A`;

const numKeypad = {
  7: [0, 0],
  8: [1, 0],
  9: [2, 0],
  4: [0, 1],
  5: [1, 1],
  6: [2, 1],
  1: [0, 2],
  2: [1, 2],
  3: [2, 2],
  0: [1, 3],
  A: [2, 3],
};

const dirKeypad = {
  "^": [1, 0],
  A: [2, 0],
  "<": [0, 1],
  v: [1, 1],
  ">": [2, 1],
};

const dirs = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};

const solution1 = (input) => {
  let ans = 0;

  const codes = input.trim().split("\n");

  for (const code of codes) {
    const codeNum = parseInt(code.replaceAll("A", ""));
    ans += codeNum * getPresses(code, 2);
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  const codes = input.trim().split("\n");

  for (const code of codes) {
    const codeNum = parseInt(code.replaceAll("A", ""));
    ans += codeNum * getPresses(code, 25);
  }

  return ans;
};

const getPresses = memoize((sequence, depth, dirKey = false, curr = null) => {
  const keypad = dirKey ? dirKeypad : numKeypad;
  if (sequence.length == 0) {
    return 0;
  }
  if (!curr) {
    curr = keypad["A"];
  }

  const [cx, cy] = curr;
  const [px, py] = keypad[sequence[0]];
  const [dx, dy] = [px - cx, py - cy];

  let keyPresses = "";
  if (dx > 0) {
    keyPresses += ">".repeat(dx);
  } else if (dx < 0) {
    keyPresses += "<".repeat(-dx);
  }
  if (dy > 0) {
    keyPresses += "v".repeat(dy);
  } else if (dy < 0) {
    keyPresses += "^".repeat(-dy);
  }

  let shortest;
  if (depth) {
    const paths = [];
    const permutations = [...new Set(generatePermutations(keyPresses))];

    for (const permutation of permutations) {
      let [xx, yy] = curr;
      let valid = true;

      for (const button of permutation) {
        const [dx, dy] = dirs[button];
        xx += dx;
        yy += dy;

        if (!Object.values(keypad).some((k) => k[0] === xx && k[1] === yy)) {
          valid = false;
          break;
        }
      }

      if (valid) {
        paths.push(getPresses(permutation + "A", depth - 1, true));
      }
    }

    shortest = Math.min(...paths);
  } else {
    shortest = keyPresses.length + 1;
  }

  return shortest + getPresses(sequence.slice(1), depth, dirKey, [px, py]);
});

function generatePermutations(str) {
  if (str.length <= 1) {
    return [str];
  }

  const result = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remainingChars = str.slice(0, i) + str.slice(i + 1);
    for (const perm of generatePermutations(remainingChars)) {
      result.push(char + perm);
    }
  }

  return result;
}

example("Part1", solution1, testInput, 126384);
answer("Part1", solution1);

answer("Part2", solution2);
