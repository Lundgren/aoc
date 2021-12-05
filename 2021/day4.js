const { inputStr, utils, answers } = require('./helper.js');

const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const findBestBoard = (input) => {
  const [draws, boards] = parseBingoInput(input);
  let minDraws = Infinity,
    bestEndDraw = 0,
    bestBoard = null;
  let maxDraws = 0,
    worstEndDraw = 0,
    worstBoard = null;

  for (const board of boards) {
    const [num, d, b] = timeUntilBingo(board, draws);

    if (num < minDraws) {
      minDraws = num;
      bestEndDraw = d;
      bestBoard = b;
    }
    if (num > maxDraws) {
      maxDraws = num;
      worstEndDraw = d;
      worstBoard = b;
    }
  }

  const sumBest = []
    .concat(...bestBoard)
    .filter((v) => v > 0)
    .reduce((p, c) => p + c, 0);
  const sumWorst = []
    .concat(...worstBoard)
    .filter((v) => v > 0)
    .reduce((p, c) => p + c, 0);

  return [sumBest * bestEndDraw, sumWorst * worstEndDraw];
};

const parseBingoInput = (input) => {
  const rows = input.split('\n');
  const draws = rows[0].split(',').map(Number);

  const boards = [[]];
  rows.slice(2).forEach((r) => {
    if (r == '') {
      boards.push([]);
    } else {
      boards[boards.length - 1].push(r.match(/\d+/g).map(Number));
    }
  });

  return [draws, boards];
};

const timeUntilBingo = (board, draws) => {
  const hitsOnRows = new Array(5).fill(0);
  const hitsOnCols = new Array(5).fill(0);

  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (board[r][c] == draw) {
          board[r][c] *= -1;
          if (++hitsOnRows[r] == 5 || ++hitsOnCols[c] == 5) {
            return [i, draw, board];
          }
        }
      }
    }
  }
};

utils.example(findBestBoard(testInput)[0], 4512);
const part1 = findBestBoard(inputStr)[0];

utils.example(findBestBoard(testInput)[1], 1924);
const part2 = findBestBoard(inputStr)[1];

answers(part1, part2);
