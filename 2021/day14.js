const { inputStr, utils, answers } = require('./helper.js');

const testInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const countElements = (input, steps) => {
  let { template, rules } = parse(input);

  // Count all pairs in the template and store in a map
  let pairs = {};
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.substring(i, i + 2);
    pairs[pair] = (pairs[pair] || 0) + 1;
  }

  // Go over each pair and replace them according to the rules
  for (let step = 0; step < steps; step++) {
    pairs = Object.entries(pairs).reduce((acc, [pair, amount]) => {
      const replace = rules[pair];
      acc[replace[0]] = (acc[replace[0]] || 0) + amount;
      acc[replace[1]] = (acc[replace[1]] || 0) + amount;
      return acc;
    }, {});
  }

  // Count first character in each pair
  const countMap = {};
  Object.entries(pairs).forEach(([[firstLetter, _], amount]) => {
    countMap[firstLetter] = (countMap[firstLetter] || 0) + amount;
  });

  // Add the last character from the template
  countMap[template[template.length - 1]]++;

  // Return most character letter - least character letter
  const sortedCounts = Object.values(countMap).sort((a, b) => b - a);

  return sortedCounts[0] - sortedCounts[sortedCounts.length - 1];
};

const parse = (input) => {
  const [template, ruleStr] = input.split('\n\n');

  const rules = {};
  ruleStr.split('\n').forEach((r) => {
    const [from, addition] = r.split(' -> ');
    rules[from] = [`${from[0]}${addition}`, `${addition}${from[1]}`];
  });

  return { template, rules };
};

utils.example(countElements(testInput, 10), 1588);
const part1 = countElements(inputStr, 10);

utils.example(countElements(testInput, 40), 2188189693529);
const part2 = countElements(inputStr, 40);

answers(part1, part2);
