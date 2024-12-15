const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

const testInput2 = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;

// NOTE: x, and y are reversed in the board (I'm to lazy to fix it)

const solution1 = (input) => {
  let ans = 0;

  const [boardStr, pathStr] = input.split("\n\n");
  const board = new Board(boardStr);
  let x = -1;
  let y = -1;
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      if (board.get(r, c) === "@") {
        x = r;
        y = c;
        board.set(r, c, ".");
      }
    }
  }

  const dirs = {
    "^": [-1, 0],
    v: [1, 0],
    "<": [0, -1],
    ">": [0, 1],
  };

  const path = pathStr.split("").filter((p) => p in dirs);
  for (const step of path) {
    const [dx, dy] = dirs[step];

    if (board.get(x + dx, y + dy) === ".") {
      x += dx;
      y += dy;
    } else if (board.get(x + dx, y + dy) === "O") {
      const boxes = [[x + dx, y + dy]];
      let xx = x + dx;
      let yy = y + dy;
      while (board.get(xx + dx, yy + dy) === "O") {
        boxes.push([xx + dx, yy + dy]);
        xx += dx;
        yy += dy;
      }

      if (board.get(xx + dx, yy + dy) === ".") {
        board.set(x + dx, y + dy, ".");
        board.set(xx + dx, yy + dy, "O");
        x += dx;
        y += dy;
      }
    }
  }

  board.set(x, y, "@");
  board.print();

  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      if (board.get(r, c) === "O") {
        ans += 100 * r + c;
      }
    }
  }
  return ans;
};

const solution2 = (input) => {
  let ans = 0;

  const [boardStr, pathStr] = input.split("\n\n");
  const wideMap = {
    "#": "##",
    O: "[]",
    ".": "..",
    "@": "@.",
    "\n": "\n",
  };
  let wideBoardStr = boardStr
    .split("")
    .map((c) => wideMap[c])
    .join("");

  const board = new Board(wideBoardStr);
  let x = -1;
  let y = -1;
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      if (board.get(r, c) === "@") {
        x = r;
        y = c;
        board.set(r, c, ".");
      }
    }
  }

  const dirs = {
    "^": [-1, 0],
    v: [1, 0],
    "<": [0, -1],
    ">": [0, 1],
  };

  const touchesWall = (boxes, dx, dy) => {
    for (const b of boxes) {
      if (
        board.get(b.l.x + dx, b.l.y + dy) === "#" ||
        board.get(b.r.x + dx, b.r.y + dy) === "#"
      ) {
        return true;
      }
    }
    return false;
  };

  const addBox = (boxes, x, y) => {
    if (board.get(x, y) === "[") {
      const key = `${x},${y} ${x},${y + 1}`;
      if (!boxes.find((b) => b.key === key)) {
        boxes.push({
          l: { x: x, y: y },
          r: { x: x, y: y + 1 },
          key,
        });
      }
    } else {
      const key = `${x},${y - 1} ${x},${y}`;
      if (!boxes.find((b) => b.key === key)) {
        boxes.push({
          l: { x: x, y: y - 1 },
          r: { x: x, y: y },
          key,
        });
      }
    }
  };

  const addBoxes = (boxes, dx, dy) => {
    for (const b of boxes) {
      if (
        board.get(b.l.x + dx, b.l.y + dy) === "[" ||
        board.get(b.l.x + dx, b.l.y + dy) === "]"
      ) {
        addBox(boxes, b.l.x + dx, b.l.y + dy);
      }
      if (
        board.get(b.r.x + dx, b.r.y + dy) === "[" ||
        board.get(b.r.x + dx, b.r.y + dy) === "]"
      ) {
        addBox(boxes, b.r.x + dx, b.r.y + dy);
      }
    }
  };

  const path = pathStr.split("").filter((p) => p in dirs);
  for (const step of path) {
    const [dx, dy] = dirs[step];

    if (board.get(x + dx, y + dy) === ".") {
      x += dx;
      y += dy;
    } else if (
      board.get(x + dx, y + dy) === "[" ||
      board.get(x + dx, y + dy) === "]"
    ) {
      const boxes = [];
      addBox(boxes, x + dx, y + dy);

      while (!touchesWall(boxes, dx, dy)) {
        const length = boxes.length;
        addBoxes(boxes, dx, dy);
        if (boxes.length === length) {
          // No new boxes added so move the boxes
          break;
        }
      }

      if (!touchesWall(boxes, dx, dy)) {
        for (const b of boxes) {
          board.set(b.l.x, b.l.y, ".");
          board.set(b.r.x, b.r.y, ".");
        }
        for (const b of boxes) {
          board.set(b.l.x + dx, b.l.y + dy, "[");
          board.set(b.r.x + dx, b.r.y + dy, "]");
        }
        x += dx;
        y += dy;
      }
    }
  }

  board.set(x, y, "@");
  board.print();

  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      if (board.get(r, c) === "[") {
        ans += 100 * r + c;
      }
    }
  }
  return ans;
};

example("Part1", solution1, testInput, 10092);
example("Part1", solution1, testInput2, 2028);
answer("Part1", solution1);

example("Part2", solution2, testInput, 9021);
answer("Part2", solution2);
