const { inputStr, utils, answers } = require('./helper.js');

const testInput = `16,1,2,0,4,2,7,1,2,14`;

const alignHorizontally = (input) => {
  const positions = input.split(',').map(Number);
  const from = Math.min(...positions),
    to = Math.max(...positions);

  let cheapest1 = Infinity;
  let cheapest2 = Infinity;
  for (let endPos = from; endPos <= to; endPos++) {
    const cost1 = fuelCostToAlignTo(positions, endPos);
    const cost2 = realFuelCostToAlignTo(positions, endPos);
    cheapest1 = Math.min(cheapest1, cost1);
    cheapest2 = Math.min(cheapest2, cost2);
  }

  return [cheapest1, cheapest2];
};

const fuelCostToAlignTo = (positions, endPosition) => {
  return positions.reduce((a, p) => a + Math.abs(p - endPosition), 0);
};

const realFuelCostToAlignTo = (positions, endPosition) => {
  return positions.reduce((a, p) => {
    const distance = Math.abs(p - endPosition);
    const cost = (distance + 1) * (distance / 2);
    return a + cost;
  }, 0);
};

utils.example(alignHorizontally(testInput)[0], 37);
const part1 = alignHorizontally(inputStr)[0];

utils.example(alignHorizontally(testInput)[1], 168);
const part2 = alignHorizontally(inputStr)[1];

answers(part1, part2);
