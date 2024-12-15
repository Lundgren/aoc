const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

const solution1 = (input) => {
  const robots = input.split("\n").map((line) => {
    const [p, v] = line.split(" ");
    const [pX, pY] = p.slice(2).split(",").map(Number);
    const [vX, vY] = v.slice(2).split(",").map(Number);
    return { pX, pY, vX, vY };
  });

  // Separate tests & input
  let width = robots.length > 12 ? 101 : 11;
  let height = robots.length > 12 ? 103 : 7;

  for (let s = 0; s < 100; s++) {
    for (let r of robots) {
      r.pX += r.vX;
      r.pY += r.vY;

      if (r.pX < 0) {
        r.pX += width;
      }
      if (r.pY < 0) {
        r.pY += height;
      }
      if (r.pX >= width) {
        r.pX -= width;
      }
      if (r.pY >= height) {
        r.pY -= height;
      }
    }
  }

  let inFirst = 0;
  let inSecond = 0;
  let inThird = 0;
  let inFourth = 0;
  for (let r of robots) {
    if (r.pX < width / 2 - 1 && r.pY < height / 2 - 1) {
      inFirst++;
    }
    if (r.pX > width / 2 && r.pY < height / 2 - 1) {
      inSecond++;
    }
    if (r.pX < width / 2 - 1 && r.pY > height / 2) {
      inThird++;
    }
    if (r.pX > width / 2 && r.pY > height / 2) {
      inFourth++;
    }
  }

  return inFirst * inSecond * inThird * inFourth;
};

const solution2 = (input) => {
  let ans = 0;

  const robots = input.split("\n").map((line) => {
    const [p, v] = line.split(" ");
    const [pX, pY] = p.slice(2).split(",").map(Number);
    const [vX, vY] = v.slice(2).split(",").map(Number);
    return { pX, pY, vX, vY };
  });

  // Separate tests & input
  let width = 101;
  let height = 103;

  let maxPairs = 0;
  let s = 1;
  while (s < 1000000) {
    for (let r of robots) {
      r.pX += r.vX;
      r.pY += r.vY;

      if (r.pX < 0) {
        r.pX += width;
      }
      if (r.pY < 0) {
        r.pY += height;
      }
      if (r.pX >= width) {
        r.pX -= width;
      }
      if (r.pY >= height) {
        r.pY -= height;
      }
    }

    let pairs = 0;
    for (let i = 0; i < robots.length; i++) {
      for (let j = i + 1; j < robots.length; j++) {
        const distance =
          Math.abs(robots[i].pX - robots[j].pX) +
          Math.abs(robots[i].pY - robots[j].pY);
        if (distance <= 1) {
          pairs++;
        }
      }
    }

    if (pairs > maxPairs) {
      console.log(`Pairs: ${pairs} at time ${s} (max: ${maxPairs})`);
      printBoard(robots, width, height);
      maxPairs = pairs;
    }

    // Found by looking at the output from the printBoard above
    if (pairs > 500) {
      ans = s;
      break;
    }

    s++;
  }

  return ans;
};

function printBoard(robots, width, height) {
  let board = Array.from({ length: height }, () => Array(width).fill("."));
  for (let r of robots) {
    board[r.pY][r.pX] = "#";
  }
  console.log(board.map((row) => row.join("")).join("\n"));
}

example("Part1", solution1, testInput, 12);
answer("Part1", solution1);

answer("Part2", solution2);
