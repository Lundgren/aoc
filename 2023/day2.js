const { inputStr, utils, answers } = require('./helper.js');

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const have = {
  red: 12,
  green: 13,
  blue: 14,
};

const calculatePossible = (input) => {
  let sum = 0;

  input.split('\n').forEach((row) => {
    const [idStr, games] = row.split(': ');
    const id = parseInt(idStr.substring(5));

    let valid = true;
    games.split('; ').forEach((round) => {
      const neededColors = {};
      round.split(', ').forEach((str) => {
        const [amountStr, color] = str.split(' ');
        const amount = parseInt(amountStr);
        const current = neededColors[color] || 0;
        neededColors[color] = current + amount;
      });

      for (const [color, amount] of Object.entries(neededColors)) {
        if (have[color] < amount) {
          valid = false;
        }
      }
    });

    if (valid) {
      sum += id;
    }
  });
  return sum;
};

const calculateSum = (input) => {
  let sum = 0;

  input.split('\n').forEach((row) => {
    const [_, games] = row.split(': ');

    const neededColors = {};
    games.split('; ').forEach((round) => {
      round.split(', ').forEach((str) => {
        const [amountStr, color] = str.split(' ');
        const amount = parseInt(amountStr);
        const current = neededColors[color] || 0;
        neededColors[color] = Math.max(current, amount);
      });
    });

    const power = Object.values(neededColors).reduce(
      (prev, curr) => prev * curr,
      1
    );
    sum += power;
  });
  return sum;
};

utils.example(calculatePossible(testInput), 8);
const part1 = calculatePossible(inputStr);

utils.example(calculateSum(testInput), 2286);
const part2 = calculateSum(inputStr);

answers(part1, part2);
