const { inputStr, utils, answers } = require('./helper.js');

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

const diagnose = (str) => {
  const reports = str.split('\n');
  const init = new Array(reports[0].length).fill(0);

  const res = reports.reduce((acc, val) => {
    [...val].forEach((c, i) => {
      if (c == '1') {
        acc[i]++;
      } else {
        acc[i]--;
      }
    });
    return acc;
  }, init);

  const epsilon = res.map((v) => (v < 0 ? '0' : '1')).join('');
  const gamma = res.map((v) => (v > 0 ? '0' : '1')).join('');

  return parseInt(epsilon, 2) * parseInt(gamma, 2);
};

const diagnose2 = (str) => {
  const oxygen = filterByCount(str, (count) => (count < 0 ? '0' : '1'));
  const scrubber = filterByCount(str, (count) => (count < 0 ? '1' : '0'));

  return parseInt(oxygen, 2) * parseInt(scrubber, 2);
};

const filterByCount = (str, filterFn) => {
  let reports = str.split('\n');
  let prefix = '';

  for (let i = 0; reports.length > 1 && i < reports[0].length; i++) {
    const count = reports.reduce(
      (tot, val) => tot + (val.charAt(i) == '1' ? 1 : -1),
      0
    );
    prefix += filterFn(count);
    reports = reports.filter((r) => r.startsWith(prefix));
  }

  return reports[0];
};

utils.example(diagnose(testInput), 198);
const part1 = diagnose(inputStr);

utils.example(diagnose2(testInput), 230);
const part2 = diagnose2(inputStr);

answers(part1, part2);
