const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

const solution1 = (input) => {
  let ans = 0;

  const list = input.split("\n").map(s => s.split("   "));
  const list1 = list.map(i => i[0]);
  const list2 = list.map(i => i[1]);

  list1.sort();
  list2.sort();

  for (let i = 0; i < list1.length; i++) {
    ans += Math.abs(list1[i] - list2[i])
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  const cache = {};

  const list = input.split("\n").map(s => s.split("   "));
  const list1 = list.map(i => i[0]);
  const list2 = list.map(i => i[1]);
  // console.log(list1)

  for (const number of list1) {
    // const number = list1[i];

    if (cache[`${number}`]) {
      ans += cache[`${number}`]
    } else {
      let count = 0;
      for (const number2 of list2) {
        if (number == number2) {
          count++;
        }
      }

      cache[`${number}`] = number * count;
      ans += number * count;
    }

  }

  return ans;
};

example("Part1", solution1, testInput, 11);
answer("Part1", solution1);

example("Part2", solution2, testInput, 31);
answer("Part2", solution2);
