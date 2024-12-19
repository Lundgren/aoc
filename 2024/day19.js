const { example, answer, inputStr } = require("../utils/helper.js");
const { memoize } = require("../utils/memoize.js");

const testInput = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

const solution1 = (input) => {
  let ans = 0;

  const [towelsStr, designsStr] = input.split("\n\n");
  const towels = towelsStr.split(", ");
  const designs = designsStr.split("\n");

  const findTowels = (design) => {
    if (design.length === 0) {
      return true;
    }

    for (const towel of towels) {
      if (design.startsWith(towel)) {
        const found = findTowels(design.slice(towel.length));
        if (found) {
          return true;
        }
      }
    }

    return false;
  };

  for (const design of designs) {
    if (findTowels(design)) {
      ans++;
    }
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  const [towelsStr, designsStr] = input.split("\n\n");
  const towels = towelsStr.split(", ");
  const designs = designsStr.split("\n");

  const findTowels = memoize((design) => {
    let count = 0;
    if (design.length === 0) {
      return 1;
    }

    for (const towel of towels) {
      if (design.startsWith(towel)) {
        const found = findTowels(design.slice(towel.length));
        if (found) {
          count += found;
        }
      }
    }

    return count;
  });

  for (const design of designs) {
    ans += findTowels(design);
  }

  return ans;
};

example("Part1", solution1, testInput, 6);
answer("Part1", solution1);

example("Part2", solution2, testInput, 16);
answer("Part2", solution2);
