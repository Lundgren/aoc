const { inputStr, utils, answers } = require('./helper.js');

const testInput1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const testInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const calibrationValues1 = (input) => {
  let tot = 0;
  input.split('\n').forEach((row) => {
    let first;
    let last;
    row.split('').forEach((char) => {
      if (parseInt(char)) {
        if (!first) {
          first = parseInt(char);
        }
        last = parseInt(char);
      }
    });
    tot += first * 10 + last;
  });
  return tot;
};

const calibrationValues2 = (input) => {
  const fixed = input
    .replaceAll('one', 'one1one')
    .replaceAll('two', 'two2two')
    .replaceAll('three', 'three3three')
    .replaceAll('four', 'four4four')
    .replaceAll('five', 'five5five')
    .replaceAll('six', 'six6six')
    .replaceAll('seven', 'seven7seven')
    .replaceAll('eight', 'eight8eight')
    .replaceAll('nine', 'nine9nine');

  return calibrationValues1(fixed);
};

utils.example(calibrationValues1(testInput1), 142);
const part1 = calibrationValues1(inputStr);

utils.example(calibrationValues2(testInput2), 281);
const part2 = calibrationValues2(inputStr);

answers(part1, part2);
