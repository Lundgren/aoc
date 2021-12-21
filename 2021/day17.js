const { utils, answers } = require('./helper.js');

// target area: x=20..30, y=-10..-5
const testInput = { x: { min: 20, max: 30 }, y: { min: -5, max: -10 } };
// target area: x=192..251, y=-89..-59
const mainInput = { x: { min: 192, max: 251 }, y: { min: -59, max: -89 } };

const findSuccessfulVelocities = (trench) => {
  let maxY = trench.y.max;
  let successfulLaunches = {};

  for (let velY = trench.y.max; velY < -trench.y.max + 100; velY++) {
    for (let velX = 1; velX <= trench.x.max; velX++) {
      let simulation = simulate(velX, velY, trench);
      if (simulation.reached) {
        maxY = Math.max(maxY, simulation.maxY);
        successfulLaunches[`${velX},${velY}`] = true;
      }
    }
  }

  return {
    maxY: maxY,
    uniques: Object.values(successfulLaunches).length,
  };
};

const simulate = (velX, velY, trench) => {
  let x = 0,
    y = 0,
    maxY = 0;
  while ((x < trench.x.min && velX > 0) || y > trench.y.min) {
    x += velX;
    y += velY;
    maxY = Math.max(maxY, y);
    velX = Math.max(velX - 1, 0);
    velY--;
  }

  return {
    reached:
      x >= trench.x.min &&
      x <= trench.x.max &&
      y <= trench.y.min &&
      y >= trench.y.max,
    maxY: maxY,
  };
};

utils.example(findSuccessfulVelocities(testInput).maxY, 45);
const part1 = findSuccessfulVelocities(mainInput).maxY;

utils.example(findSuccessfulVelocities(testInput).uniques, 112);
const part2 = findSuccessfulVelocities(mainInput).uniques;

answers(part1, part2);
