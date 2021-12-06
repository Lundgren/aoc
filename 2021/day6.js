const { inputStr, utils, answers } = require('./helper.js');

const testInput = `3,4,3,1,2`;

const simulateBreeding = (input) => {
  let fishes = input.split(',').map(Number);

  for (let i = 0; i < 80; i++) {
    let fishBabies = 0;
    fishes = fishes.map((f) => {
      if (f == 0) {
        fishBabies++;
        return 6;
      }
      return f - 1;
    });

    fishes = fishes.concat(new Array(fishBabies).fill(8));
  }

  return fishes.length;
};

const simulateBreeding2 = (input) => {
  const fishGroups = new Array(9).fill(0);
  input
    .split(',')
    .map(Number)
    .forEach((n) => fishGroups[n]++);

  for (let i = 0; i < 256; i++) {
    let fishBabies = 0;
    fishGroups.forEach((f, i) => {
      if (i == 0) {
        fishBabies = f;
      } else {
        fishGroups[i - 1] = f;
        fishGroups[i] = 0;
      }
    });

    fishGroups[6] += fishBabies;
    fishGroups[8] += fishBabies;
  }

  return fishGroups.reduce((a, f) => a + f, 0);
};

utils.example(simulateBreeding(testInput), 5934);
const part1 = simulateBreeding(inputStr);

utils.example(simulateBreeding2(testInput), 26984457539);
const part2 = simulateBreeding2(inputStr);

answers(part1, part2);
