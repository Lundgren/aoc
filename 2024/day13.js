const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

const solution1 = (input) => {
  let ans = 0;

  const machines = input
    .trim()
    .split("\n\n")
    .map((machine) => {
      const lines = machine.split("\n");
      const [ax, ay] = lines[0].match(/-?\d+/g).map(Number);
      const [bx, by] = lines[1].match(/-?\d+/g).map(Number);
      const [px, py] = lines[2].match(/-?\d+/g).map(Number);
      return {
        a: { x: ax, y: ay },
        b: { x: bx, y: by },
        prize: {
          x: px,
          y: py,
        },
      };
    });

  for (const m of machines) {
    const { a, b, prize } = m;
    const { x, y } = prize;

    let cheapest = Infinity;
    for (let aPresses = 0; aPresses < 10000; aPresses++) {
      let bPresses = 0;
      let xPos;
      let yPos;
      do {
        xPos = aPresses * a.x + bPresses * b.x;
        yPos = aPresses * a.y + bPresses * b.y;

        if (xPos === x && yPos === y) {
          cheapest = Math.min(cheapest, aPresses * 3 + bPresses);
        }

        bPresses++;
      } while (xPos < x && yPos < y && bPresses < 10000);
    }

    if (cheapest < Infinity) {
      ans += cheapest;
    }
  }

  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  const machines = input
    .trim()
    .split("\n\n")
    .map((machine) => {
      const lines = machine.split("\n");
      const [ax, ay] = lines[0].match(/-?\d+/g).map(Number);
      const [bx, by] = lines[1].match(/-?\d+/g).map(Number);
      const [px, py] = lines[2].match(/-?\d+/g).map(Number);
      return {
        a: { x: ax, y: ay },
        b: { x: bx, y: by },
        prize: {
          x: px + 10000000000000,
          y: py + 10000000000000,
        },
      };
    });

  for (const m of machines) {
    const { a, b, prize } = m;
    const { x, y } = prize;

    // Thanks previous years of AoC!
    // Solve:
    //   aPresses * a.x + bPresses + b.x = x
    //   aPresses * a.y + bPresses + b.y = y
    const aPresses = (x * b.y - y * b.x) / (a.x * b.y - a.y * b.x);
    const bPresses = (y * a.x - x * a.y) / (a.x * b.y - a.y * b.x);

    // Game is solvable if the result is an integer
    if (Number.isInteger(aPresses) && Number.isInteger(bPresses)) {
      ans += 3 * aPresses + bPresses;
    }
  }

  return ans;
};

example("Part1", solution1, testInput, 480);
answer("Part1", solution1);

example("Part2", solution2, testInput, 10);
answer("Part2", solution2);
