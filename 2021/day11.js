const { utils, answers } = require('./helper.js');

const testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const inputStr = `8448854321
4447645251
6542573645
4725275268
6442514153
4515734868
5513676158
3257376185
2172424467
6775163586`;

const countFlashes = (input) => {
  const octopuses = parse(input);

  let flashes = 0;
  for (let step = 0; step < 100; step++) {
    flashes += doStep(octopuses);
  }

  return flashes;
};

const findWhenAllFlashes = (input) => {
  const octopuses = parse(input);

  for (let step = 1; ; step++) {
    if (doStep(octopuses) == 100) {
      return step;
    }
  }
};

const doStep = (octopuses) => {
  // First: Increase all by 1
  octopuses.forEach((o) => o.energy++);

  // Then: Handle flashes
  do {
    octopuses
      .filter((o) => o.energy > 9 && !o.flashed)
      .forEach((o) => {
        o.flashed = true;
        o.neighbors.forEach((n) => n.energy++);
      });
  } while (octopuses.filter((o) => o.energy > 9 && !o.flashed).length > 0);

  // Finally: Set flashed to 0
  octopuses
    .filter((o) => o.flashed)
    .forEach((o) => {
      o.energy = 0;
      o.flashed = false;
    });

  return octopuses.filter((o) => o.energy == 0).length;
};

const parse = (input) => {
  const data = input.split('\n').map((r) => r.split('').map(Number));

  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      data[row][col] = {
        energy: data[row][col],
        flashed: false,
        neighbors: [],
      };
    }
  }

  const octopuses = [];
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      // Add all adjacent (and self) as "neighbors"
      for (let deltaR = -1; deltaR <= 1; deltaR++) {
        for (let deltaC = -1; deltaC <= 1; deltaC++) {
          if ((data[row + deltaR] || [])[col + deltaC] != undefined) {
            data[row][col].neighbors.push(data[row + deltaR][col + deltaC]);
          }
        }
      }
      octopuses.push(data[row][col]);
    }
  }

  return octopuses;
};

utils.example(countFlashes(testInput), 1656);
const part1 = countFlashes(inputStr);

utils.example(findWhenAllFlashes(testInput), 195);
const part2 = findWhenAllFlashes(inputStr);

answers(part1, part2);
