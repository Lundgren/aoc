const { utils, answers } = require('./helper.js');

// 1+1+1, 1+1+2, ..., 3+3+3
const QUANTUM_THROWS = [
  3, 4, 5, 4, 5, 6, 5, 6, 7, 4, 5, 6, 5, 6, 7, 6, 7, 8, 5, 6, 7, 6, 7, 8, 7, 8,
  9,
];

const testInput = [4, 8];
const mainInput = [6, 9];

function* doTurn() {
  let d = 0,
    rolls = 0,
    player = -1;
  while (true) {
    yield [++d + ++d + ++d, ++player % 2, ++rolls * 3];
  }
}

const deterministic = (startPositions) => {
  const positions = [...startPositions];
  let scores = [0, 0];

  for (const [roll, player, nbrOfRolls] of doTurn()) {
    positions[player] = ((positions[player] + roll - 1) % 10) + 1;
    scores[player] += positions[player];

    if (scores[player] >= 1000) {
      return Math.min(...scores) * nbrOfRolls;
    }
  }
};

const quantum = (startPos) => {
  return Math.max(...quantumPlay(startPos[0], 0, startPos[1], 0, 0));
};

const scoreCache = {};
const cachedPlay = (...args) => {
  const key = args.join(',');
  if (!(key in scoreCache)) {
    const score = quantumPlay(...args);
    scoreCache[key] = score;
  }

  return scoreCache[key];
};

const quantumPlay = (p1Pos, p1Score, p2Pos, p2Score, nextPlayer) => {
  if (p1Score >= 21) {
    return [1, 0];
  } else if (p2Score >= 21) {
    return [0, 1];
  }

  if (nextPlayer == 0) {
    return QUANTUM_THROWS.reduce(
      (acc, t) => {
        const newPos = ((p1Pos + t - 1) % 10) + 1;
        const score = cachedPlay(newPos, p1Score + newPos, p2Pos, p2Score, 1);
        return [acc[0] + score[0], acc[1] + score[1]];
      },
      [0, 0]
    );
  }
  return QUANTUM_THROWS.reduce(
    (acc, t) => {
      const newPos = ((p2Pos + t - 1) % 10) + 1;
      const score = cachedPlay(p1Pos, p1Score, newPos, p2Score + newPos, 0);
      return [acc[0] + score[0], acc[1] + score[1]];
    },
    [0, 0]
  );
};

utils.example(deterministic(testInput), 739785);
const part1 = deterministic(mainInput);

utils.example(quantum(testInput), 444356092776315);
const part2 = quantum(mainInput);

answers(part1, part2);
