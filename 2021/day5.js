const { inputStr, utils, answers } = require('./helper.js');

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const mapVents = (input, diagonal = false) => {
  const vents = parseInput(input);
  const seaFloor = [...Array(1000)].map((_) => Array(1000).fill(0));

  for (const v of vents) {
    if (v.from.x == v.to.x || v.from.y == v.to.y || diagonal) {
      seaFloor[v.from.y][v.from.x]++;
      while (v.from.x != v.to.x || v.from.y != v.to.y) {
        v.from.x += direction(v.from.x, v.to.x);
        v.from.y += direction(v.from.y, v.to.y);
        seaFloor[v.from.y][v.from.x]++;
      }
    }
  }

  // utils.printMatrix(seaFloor, (x) => (x == 0 ? '.' : x));

  return seaFloor.reduce(
    (tot, row) => tot + row.reduce((acc, v) => acc + (v > 1 ? 1 : 0), 0),
    0
  );
};

const parseInput = (input) => {
  return input.split('\n').map((c) => {
    const coordPairs = c.split(' -> ');
    const from = coordPairs[0].split(',').map(Number);
    const to = coordPairs[1].split(',').map(Number);
    return { from: { x: from[0], y: from[1] }, to: { x: to[0], y: to[1] } };
  });
};

const direction = (from, to) => {
  if (from == to) return 0;
  if (from < to) return 1;
  return -1;
};

utils.example(mapVents(testInput), 5);
const part1 = mapVents(inputStr);

utils.example(mapVents(testInput, true), 12);
const part2 = mapVents(inputStr, true);

answers(part1, part2);
