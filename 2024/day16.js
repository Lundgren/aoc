const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const testInput2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

const solution1 = (input) => {
  const board = new Board(input);
  const start = board.find("S");

  return walkFastest(board, start);
};

const solution2 = (input) => {
  const board = new Board(input);
  const start = board.find("S");


  const allPaths = walkAll(board, start);

  const uniqueTiles = new Set();
  for (const path of allPaths) {
    for (const tile of path) {
      uniqueTiles.add(tile);
    }
  }

  return uniqueTiles.size;
};

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

class State {
  constructor(y, x, dir, cost, path) {
    this.y = y;
    this.x = x;
    this.dir = dir;
    this.cost = cost;
    this.path = path ? [...path, `${y},${x}`] : undefined;
  }

  key() {
    return `${this.y},${this.x},${this.dir}`;
  }
}

function walkFastest(board, start) {
  const pq = [new State(start[0], start[1], 0, 0)];
  const seen = new Set();

  while (pq.length > 0) {
    const curr = pq.shift();
    const key = curr.key();

    if (seen.has(key)) {
      continue;
    }
    seen.add(key);

    if (board.get(curr.y, curr.x) === "E") {
      return curr.cost;
    }

    // Turn left or right
    [3, 1].forEach((turn) => {
      const newDir = (curr.dir + turn) % 4;
      pq.push(new State(curr.y, curr.x, newDir, curr.cost + 1000, []));
    });

    // Move forward
    const [dy, dx] = dirs[curr.dir];
    const yy = curr.y + dy;
    const xx = curr.x + dx;

    if (board.get(yy, xx) !== "#" && board.get(yy, xx) !== undefined) {
      pq.push(new State(yy, xx, curr.dir, curr.cost + 1));
    }

    // Prioritize the "Priority Queue"
    pq.sort((a, b) => a.cost - b.cost);
  }

  return Infinity;
}

function walkAll(board, start) {
  const pq = [new State(start[0], start[1], 0, 0, [])];

  let shortest = Infinity;
  let paths = [];
  const lowestCost = {};

  while (pq.length > 0) {
    const curr = pq.shift();
    const key = curr.key();

    // Filter all nodes that have a higher cost than the cheapest
    const cheapest = lowestCost[key] || Infinity;
    if (curr.cost > cheapest || curr.cost > shortest) {
      continue;
    }
    lowestCost[key] = curr.cost;

    if (board.get(curr.y, curr.x) === "E") {
      if (curr.cost <= shortest) {
        if (curr.cost < shortest) {
          paths = [];
          shortest = curr.cost;
        }
        paths.push(curr.path);
      }
      continue;
    }

    // Turn left or right
    [3, 1].forEach((turn) => {
      const newDir = (curr.dir + turn) % 4;
      pq.push(new State(curr.y, curr.x, newDir, curr.cost + 1000, curr.path));
    });

    // Move forward
    const [dy, dx] = dirs[curr.dir];
    const yy = curr.y + dy;
    const xx = curr.x + dx;

    if (board.get(yy, xx) !== "#" && board.get(yy, xx) !== undefined) {
        pq.push(new State(yy, xx, curr.dir, curr.cost + 1, curr.path));
    }

    // Prioritize the "Priority Queue"
    pq.sort((a, b) => a.cost - b.cost);
  }

  return paths;
}

example("Part1", solution1, testInput, 7036);
example("Part1", solution1, testInput2, 11048);
answer("Part1", solution1);

example("Part2", solution2, testInput, 45);
example("Part2", solution2, testInput2, 64);
answer("Part2", solution2);
