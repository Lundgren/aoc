const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `Time:      7  15   30
Distance:  9  40  200`;

const solution1 = (input) => {
  const [timeRow, distRow] = input.split("\n");
  const [_t, ...times] = timeRow.split(/\s+/g).map(Number);
  const [_d, ...distances] = distRow.split(/\s+/g).map(Number);

  const beaten = [];
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    let timesBeaten = 0;

    for (let hold = 1; hold < time; hold++) {
      const distance = hold * (time - hold);
      if (distance > distances[i]) {
        timesBeaten++;
      }
    }

    beaten.push(timesBeaten);
  }

  return beaten.reduce((prev, curr) => prev * curr, 1);
};

const solution2 = (input) => {
  const [timeRow, distRow] = input.replaceAll(" ", "").split("\n");
  const time = parseInt(timeRow.split(":")[1]);
  const distance = parseInt(distRow.split(":")[1]);

  let timesBeaten = 0;

  for (let hold = 1; hold < time; hold++) {
    const potential = hold * (time - hold);
    if (potential > distance) {
      timesBeaten++;
    }
  }

  return timesBeaten;
};

example("Part1", solution1, testInput, 288);
answer("Part1", solution1);

example("Part2", solution2, testInput, 71503);
answer("Part2", solution2);
