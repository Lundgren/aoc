const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

const solution1 = (input) => {
  let board = new Board(input);

  let changed = true;
  while (changed) {
    changed = false;
    board.forEach((val, r, c) => {
      if (val === "O" && board.getAbove(r, c) === ".") {
        board.set(r, c, ".");
        board.set(r - 1, c, "O");
        changed = true;
      }
    });
  }

  let load = 0;
  board.forEach((val, r, c) => {
    if (val === "O") {
      load += board.height - r;
    }
  });

  return load;
};

const solution2 = (input) => {
  let board = new Board(input);

  const seenStates = {};

  let cycle = 0;
  while (!(board in seenStates)) {
    seenStates[board] = cycle;
    cycle++;

    // North
    let changed = true;
    while (changed) {
      changed = false;
      board.forEach((val, r, c) => {
        if (val === "O" && board.getAbove(r, c) === ".") {
          board.set(r, c, ".");
          board.set(r - 1, c, "O");
          changed = true;
        }
      });
    }

    // West
    changed = true;
    while (changed) {
      changed = false;
      board.forEach((val, r, c) => {
        if (val === "O" && board.getLeftOf(r, c) === ".") {
          board.set(r, c, ".");
          board.set(r, c - 1, "O");
          changed = true;
        }
      });
    }

    // South
    changed = true;
    while (changed) {
      changed = false;
      board.forEach((val, r, c) => {
        if (val === "O" && board.getBelow(r, c) === ".") {
          board.set(r, c, ".");
          board.set(r + 1, c, "O");
          changed = true;
        }
      });
    }

    // East
    changed = true;
    while (changed) {
      changed = false;
      board.forEach((val, r, c) => {
        if (val === "O" && board.getRightOf(r, c) === ".") {
          board.set(r, c, ".");
          board.set(r, c + 1, "O");
          changed = true;
        }
      });
    }
  }

  const start = seenStates[board];
  const period = cycle - start;
  const finalCycle = ((1000000000 - start) % period) + start;

  for (const [state, seenCycle] of Object.entries(seenStates)) {
    if (seenCycle === finalCycle) {
      let load = 0;
      new Board(state).forEach((val, r, c) => {
        if (val === "O") {
          load += board.height - r;
        }
      });

      return load;
    }
  }
};

example("Part1", solution1, testInput, 136);
answer("Part1", solution1);

example("Part2", solution2, testInput, 64);
answer("Part2", solution2);
