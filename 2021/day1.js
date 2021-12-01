const assert = require('assert');
const fs = require('fs');

const input = fs.readFileSync('day1.input').toString('utf-8');

const testInput = `199
200
208
210
200
207
240
269
260
263`;

const toArray = (str) => str.split('\n').map(Number);
const toWindowedArray = (str) => {
  return str
    .split('\n')
    .map(Number)
    .map((_, i, arr) => arr[i] + arr[i + 1] + arr[i + 2])
    .slice(0, -2);
};

const countIncreases = (depths) => {
  return depths.reduce(
    ([count, prevVal], currVal) => [
      count + (currVal > prevVal ? 1 : 0),
      currVal,
    ],
    [0, 1e20]
  )[0];
};

assert(countIncreases(toArray(testInput)) == 7);
const part1 = countIncreases(toArray(input));

assert(countIncreases(toWindowedArray(testInput)) == 5);
const part2 = countIncreases(toWindowedArray(input));

console.log(`Part1: ${part1}, Part2: ${part2}`);
