const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const solution1 = (input) => {
  let ans = 0;

  const [rulesData, pagesData] = input.split("\n\n");
  const rules = rulesData.split("\n").map((r) => r.split("|").map(Number));
  const pages = pagesData.split("\n").map((p) => p.split(",").map(Number));

  const rulesMap = new Map();
  rules.forEach(([from, to]) => {
    if (!rulesMap.has(from)) {
      rulesMap.set(from, new Set());
    }
    rulesMap.get(from).add(to);
  });

  for (const page of pages) {
    let valid = true;
    for (let i = 1; i < page.length; i++) {
      if (rulesMap.has(page[i])) {
        const avoid = rulesMap.get(page[i]);
        for (let j = i - 1; j >= 0; j--) {
          if (avoid.has(page[j])) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      ans += page[Math.floor(page.length / 2)];
    }
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  const [rulesData, pagesData] = input.split("\n\n");
  const rules = rulesData.split("\n").map((r) => r.split("|").map(Number));
  let pages = pagesData.split("\n").map((p) => p.split(",").map(Number));

  const rulesMap = new Map();
  rules.forEach(([from, to]) => {
    if (!rulesMap.has(from)) {
      rulesMap.set(from, new Set());
    }
    rulesMap.get(from).add(to);
  });

  // Remove correct pages
  pages = pages.filter((p) => !isValid(p, rulesMap)[0]);

  // Fix the incorrect pages
  for (const page of pages) {
    let valid = false;
    while (!valid) {
      const [isValidPage, idx] = isValid(page, rulesMap);
      if (!isValidPage) {
        if (idx > 0) {
          const temp = page[idx];
          page[idx] = page[idx - 1];
          page[idx - 1] = temp;
        }
        i++;
      }
      valid = isValidPage;
    }
  }

  for (const page of pages) {
    let valid = true;
    for (let i = 1; i < page.length; i++) {
      if (rulesMap.has(page[i])) {
        const avoid = rulesMap.get(page[i]);
        for (let j = i - 1; j >= 0; j--) {
          if (avoid.has(page[j])) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      ans += page[Math.floor(page.length / 2)];
    }
  }

  return ans;
};

function isValid(page, rulesMap) {
  for (let i = 1; i < page.length; i++) {
    if (rulesMap.has(page[i])) {
      const avoid = rulesMap.get(page[i]);
      for (let j = i - 1; j >= 0; j--) {
        if (avoid.has(page[j])) {
          return [false, i];
        }
      }
    }
  }

  return [true, -1];
}

example("Part1", solution1, testInput, 143);
answer("Part1", solution1);

example("Part2", solution2, testInput, 123);
answer("Part2", solution2);
