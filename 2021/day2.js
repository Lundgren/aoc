const assert = require('assert');
const fs = require('fs');

const input = fs.readFileSync('day2.input').toString('utf-8');

const testInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

const move1 = (directions) => {
  let x = 0,
    y = 0;

  directions.split('\n').forEach((dir) => {
    const [motion, steps] = dir.split(' ');

    switch (motion) {
      case 'forward':
        x += parseInt(steps);
        break;
      case 'down':
        y += parseInt(steps);
        break;
      case 'up':
        y -= parseInt(steps);
        break;
    }
  });

  return x * y;
};

const move2 = (directions) => {
  let x = 0,
    y = 0,
    aim = 0;

  directions.split('\n').forEach((dir) => {
    const [motion, steps] = dir.split(' ');

    switch (motion) {
      case 'forward':
        x += parseInt(steps);
        y += aim * parseInt(steps);
        break;
      case 'down':
        aim += parseInt(steps);
        break;
      case 'up':
        aim -= parseInt(steps);
        break;
    }
  });

  return x * y;
};

assert(move1(testInput) == 150);
const part1 = move1(input);

console.log(move2(testInput));
assert(move2(testInput) == 900);
const part2 = move2(input);

console.log(`Part1: ${part1}, Part2: ${part2}`);
