const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `1
10
100
2024`;

const testInput2 = `1
2
3
2024`;

const solution1 = (input) => {
  let ans = 0;

  const secrets = input.split("\n").map(Number);
  for (const secret of secrets) {
    let val = secret;
    for (let i = 0; i < 2000; i++) {
      val = evolve(val);
    }
    ans += val;
  }

  return ans;
};

const solution2 = (input) => {
  const secrets = input.split("\n").map(Number);

  const buyerPatterns = secrets.map((secret) => {
    const patterns = {};
    const prices = [];
    
    let val = secret;
    prices.push(val % 10);

    for (let i = 0; i < 2000; i++) {
      val = evolve(val);
      prices.push(val % 10);
    }

    const changes = [];
    for (let i = 1; i < prices.length; i++) {
      changes.push(prices[i] - prices[i - 1]);
    }

    for (let i = 0; i < changes.length - 3; i++) {
      const pattern = `${changes[i]},${changes[i + 1]},${changes[i + 2]},${
        changes[i + 3]
      }`;
      if (!(pattern in patterns)) {
        patterns[pattern] = prices[i + 4];
      }
    }

    return patterns;
  });

  const totals = {};
  buyerPatterns.forEach((patterns) => {
    Object.entries(patterns).forEach(([pattern, price]) => {
      totals[pattern] = (totals[pattern] || 0) + price;
    });
  });

  return Math.max(...Object.values(totals));
};

function evolve(secret) {
  let result = BigInt(secret);

  result = mix(result * 64n, result);
  result = prune(result);

  result = mix(result / 32n, result);
  result = prune(result);

  result = mix(result * 2048n, result);
  result = prune(result);

  return Number(result);
}

function mix(value, secret) {
  return value ^ secret;
}

function prune(secret) {
  return secret & BigInt(16777215);
}

example("Part1", solution1, testInput, 37327623);
answer("Part1", solution1);

example("Part2", solution2, testInput2, 23);
answer("Part2", solution2);
