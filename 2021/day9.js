const { inputStr, utils, answers } = require('./helper.js');

const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const calculateRiskLevel = (input) => {
  const heightMap = parse(input);

  let riskLevel = 0;
  for (let row = 1; row < heightMap.length - 1; row++) {
    for (let col = 1; col < heightMap[row].length - 1; col++) {
      const height = heightMap[row][col];
      if (
        height < heightMap[row - 1][col] &&
        height < heightMap[row][col + 1] &&
        height < heightMap[row + 1][col] &&
        height < heightMap[row][col - 1]
      ) {
        riskLevel += height + 1;
      }
    }
  }

  return riskLevel;
};

const calculateBasins = (input) => {
  const heightMap = parse(input);

  let basins = [];
  const stack = [];
  for (let row = 1; row < heightMap.length - 1; row++) {
    for (let col = 1; col < heightMap[row].length - 1; col++) {
      const height = heightMap[row][col];
      if (height < 9) {
        let basinSize = 0;
        stack.push({ row: row, col: col });
        while (stack.length > 0) {
          const n = stack.pop();
          if (heightMap[n.row][n.col] < 9) {
            basinSize++;
            heightMap[n.row][n.col] = 9;

            if (heightMap[n.row - 1][n.col] < 9) {
              stack.push({ row: n.row - 1, col: n.col });
            }
            if (heightMap[n.row][n.col + 1] < 9) {
              stack.push({ row: n.row, col: n.col + 1 });
            }
            if (heightMap[n.row + 1][n.col] < 9) {
              stack.push({ row: n.row + 1, col: n.col });
            }
            if (heightMap[n.row][n.col - 1] < 9) {
              stack.push({ row: n.row, col: n.col - 1 });
            }
          }
        }
        basins.push(basinSize);
      }
    }
  }

  basins.sort((a, b) => b - a);
  return basins[0] * basins[1] * basins[2];
};

// To int matrix surrounded by 9's
const parse = (str) => {
  const lines = str.split('\n');
  const endLine = new Array(lines[0].length).fill('9').join('');
  return [endLine, ...lines, endLine].map((l) =>
    `9${l}9`.split('').map(Number)
  );
};

utils.example(calculateRiskLevel(testInput), 15);
const part1 = calculateRiskLevel(inputStr);

utils.example(calculateBasins(testInput), 1134);
const part2 = calculateBasins(inputStr);

answers(part1, part2);
