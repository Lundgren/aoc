const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const solution1 = (input) => {
  let ans = 0;

  const equations = input.split("\n").map((line) => {
    const [lhs, rhs] = line.split(": ");
    return [parseInt(lhs), rhs.split(" ").map((x) => parseInt(x))];
  });

  for (const eq of equations) {
    const [lhs, rhs] = eq;
    const operators = ["+", "*"];

    const evaluate = (nums, ops) => {
      let result = nums[0];
      for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "+") {
          result += nums[i + 1];
        } else if (ops[i] === "*") {
          result *= nums[i + 1];
        }
      }
      return result;
    };

    const combinations = generatePermutations(rhs.length - 1, operators);

    for (const combo of combinations) {
      if (evaluate(rhs, combo) === lhs) {
        ans += lhs;
        break;
      }
    }
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  const equations = input.split("\n").map((line) => {
    const [lhs, rhs] = line.split(": ");
    return [parseInt(lhs), rhs.split(" ").map((x) => parseInt(x))];
  });

  for (const eq of equations) {
    const [lhs, rhs] = eq;
    const operators = ["+", "*", "||"];

    const evaluate = (nums, ops) => {
      let result = nums[0];
      for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "+") {
          result += nums[i + 1];
        } else if (ops[i] === "*") {
          result *= nums[i + 1];
        } else if (ops[i] === "||") {
          result = parseInt(result + "" + nums[i + 1]);
        }
      }
      return result;
    };

    const combinations = generatePermutations(rhs.length - 1, operators);

    for (const combo of combinations) {
      if (evaluate(rhs, combo) === lhs) {
        ans += lhs;
        break;
      }
    }
  }

  return ans;
};

function generatePermutations(n, ops) {
  if (n === 1) return ops.map((op) => [op]);
  const permutations = [];
  const smallerPermutations = generatePermutations(n - 1, ops);
  for (const perm of smallerPermutations) {
    for (const op of ops) {
      permutations.push([...perm, op]);
    }
  }
  return permutations;
}

example("Part1", solution1, testInput, 3749);
answer("Part1", solution1);

example("Part2", solution2, testInput, 11387);
answer("Part2", solution2);
