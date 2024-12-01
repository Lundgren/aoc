const { group } = require("console");
const { example, answer, inputStr, origLogger } = require("../utils/helper.js");

const testInput = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

const Memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const str = args.join(",");
    if (cache[str]) {
      return cache[str];
    }

    const result = fn(...args);
    cache[str] = result;
    return result;
  };
};

class Cache {
  results = new Map();
  get(springsIndex, recordsIndex) {
    return this.results.get((springsIndex << 16) | recordsIndex);
  }
  set(springsIndex, recordsIndex, value) {
    this.results.set((springsIndex << 16) | recordsIndex, value);
  }
}

const countArrangements = (row, springIdx, groupIdx, cache) => {
  if (cache.get(springIdx, groupIdx) !== undefined) {
    return cache.get(springIdx, groupIdx);
  }

  if (groupIdx >= row.groups.length) {
    const lastDamaged = row.springs.lastIndexOf("#");
    if (springIdx <= lastDamaged) {
      return 0;
    }

    return 1;
  }

  if (springIdx >= row.springs.length) {
    return 0;
  }

  const group = row.groups[groupIdx];
  let valid = true;
  for (let i = springIdx; i < springIdx + group; i++) {
    if (row.springs[i] !== ".") {
      valid = false;
      break;
    }
  }

  let sum = 0;
  if (valid && row.springs[springIdx + group] !== "#") {
    sum += countArrangements(row, springIdx + group + 1, groupIdx + 1, cache);
  }

  if (row.springs[springIdx] !== "#") {
    sum += countArrangements(row, springIdx + 1, groupIdx, cache);
  }

  cache.set(springIdx, groupIdx, sum);
  return sum;
};

const parseRow = (row) => {
  const [springsStr, groupStr] = row.split(" ");

  const springs = springsStr
    .replace(/^\.+|\.+$/g, "") // dots at start and end do nothing, remove them!
    .replace(/\.{2,}/g, ".") // consecutive dots do nothing, remove them!
    .split("");

  const groups = groupStr.split(",").map(Number);

  return { springs, groups };
};

const solution1 = (input) => {
  let sum = 0;
  const count = input.split("\n").length;
  input
    .split("\n")
    .map(parseRow)
    .forEach((row, i) => {
      // const [str, keys] = line.split(" ");
      // origLogger(`Checking ${i}/${count}`, line);
      // const arr = keys.split(",").map((x) => parseInt(x));
      // console.log("Checking", line);
      sum += countArrangements(row, 0, 0, new Cache());
    });

  return sum;
};

const solution2 = (input) => {
  let sum = 0;
  const count = input.split("\n").length;
  input.split("\n").forEach((line, i) => {
    // const [str, keys] = line.split(" ");
    origLogger(`Checking ${i}/${count}`, line);
    // const arr = keys.split(",").map((x) => parseInt(x));
    // console.log("Checking", line);
    let spl = line.split(" ");
    const str =
      spl[0] +
      ("?" + spl[0]).repeat(4) +
      " " +
      spl[1] +
      ("," + spl[1]).repeat(4);

    const countMine = countValidArrangementsDynamic(str);

    const [str2, keyStr] = line.split(" ");
    const keys = keyStr ? keyStr.split(",").map(Number) : [];
    // const countTheir = findPossibleAssignments(str2, keys);

    // if (countMine !== countTheir) {
    //   origLogger("Mine", countMine);
    //   origLogger("Their", countTheir);
    //   origLogger("Diff", countMine - countTheir);
    //   origLogger("Str", str);
    //   return 0;
    // }

    sum += countMine;
    // sum += countValidArrangementsDynamic(str);
  });

  return sum;
};

example("Part1", solution1, testInput, 21);
answer("Part1", solution1);

// example("Part2", solution2, testInput, 525152);
// answer("Part2", solution2); // 1776946011113 too high
//                             1738259948652 is correct?
