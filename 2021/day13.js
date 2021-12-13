const { inputStr, utils, answers } = require('./helper.js');

const testInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

const foldAndCount = (input, maxFolds = Infinity) => {
  const { maxX, maxY, coords, folds } = parse(input);

  let board = Array.from(Array(maxY + 1), () => new Array(maxX + 1).fill(0));
  for (const coord of coords) {
    board[coord[1]][coord[0]] = 1;
  }

  for (let f = 0; f < folds.length && f < maxFolds; f++) {
    let [direction, pos] = folds[f];
    pos = parseInt(pos);

    if (direction == 'y') {
      const foldedArea = board.slice(pos + 1);
      board = board.slice(0, pos);

      foldedArea.forEach((row, y) => {
        row.forEach((val, x) => {
          const foldedY = board.length - y - 1;
          board[foldedY][x] = Math.max(val, board[foldedY][x]);
        });
      });
    } else {
      const foldedArea = board.map((row) => row.slice(pos + 1));
      board = board.map((row) => row.slice(0, pos));

      foldedArea.forEach((row, y) => {
        row.forEach((val, x) => {
          const foldedX = board[0].length - x - 1;
          board[y][foldedX] = Math.max(val, board[y][foldedX]);
        });
      });
    }
  }

  utils.printMatrix(board, (v) => (v == 1 ? '#' : ' '));
  return board.reduce((acc, line) => acc + line.reduce((a, v) => a + v), 0, 0);
};

const parse = (input) => {
  const [coordsStr, foldsStr] = input.split('\n\n');

  const coords = coordsStr.split('\n').map((s) => s.split(',').map(Number));
  const [maxX, maxY] = coords.reduce(
    (acc, c) => [Math.max(acc[0], c[0]), Math.max(acc[1], c[1])],
    [0, 0]
  );

  const folds = foldsStr.split('\n').map((s) => s.substring(11).split('='));
  return {
    maxX,
    maxY,
    coords,
    folds,
  };
};

utils.example(foldAndCount(testInput, 1), 17);
const part1 = foldAndCount(inputStr, 1);

foldAndCount(inputStr);

answers(part1, 'See output file (PFKLKCFP)');
