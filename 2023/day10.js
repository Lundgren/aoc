const { example, answer, inputStr } = require("../utils/helper.js");
const { Board } = require("../utils/board.js");

const testInput = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const testInput2 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

const testInput3 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77 
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

const nextDirection = (direction, pipe) => {
  switch (direction) {
    case "north":
      switch (pipe) {
        case "|":
          return "north";
        case "7":
          return "west";
        case "F":
          return "east";
      }

    case "south":
      switch (pipe) {
        case "|":
          return "south";
        case "L":
          return "east";
        case "J":
          return "west";
      }

    case "east":
      switch (pipe) {
        case "-":
          return "east";
        case "J":
          return "north";
        case "7":
          return "south";
      }

    case "west":
      switch (pipe) {
        case "-":
          return "west";
        case "L":
          return "north";
        case "F":
          return "south";
      }
  }
};

const parse = (input) => {
  const board = new Board(input);
  const [startRow, startCol] = board.find("S");

  const starts = [];
  if (
    board.getLeftOf(startRow, startCol) == "-" ||
    board.getLeftOf(startRow, startCol) == "L" ||
    board.getLeftOf(startRow, startCol) == "F"
  ) {
    starts.push([startRow, startCol - 1, "west"]);
  }
  if (
    board.getRightOf(startRow, startCol) == "-" ||
    board.getRightOf(startRow, startCol) == "J" ||
    board.getRightOf(startRow, startCol) == "7"
  ) {
    starts.push([startRow, startCol + 1, "east"]);
  }
  if (
    board.getAbove(startRow, startCol) == "|" ||
    board.getAbove(startRow, startCol) == "F" ||
    board.getAbove(startRow, startCol) == "7"
  ) {
    starts.push([startRow - 1, startCol, "north"]);
  }
  if (
    board.getBelow(startRow, startCol) == "|" ||
    board.getBelow(startRow, startCol) == "L" ||
    board.getBelow(startRow, startCol) == "J"
  ) {
    starts.push([startRow + 1, startCol, "south"]);
  }

  return [board, starts];
};

const solution1 = (input) => {
  const [board, starts] = parse(input);

  const mapping = {};
  for (const start of starts) {
    let [row, col, direction] = start;
    let steps = 1;

    while (board.get(row, col) != "S") {
      const prev = mapping[`${row}-${col}`] || 1e10;
      mapping[`${row}-${col}`] = Math.min(prev, steps);

      direction = nextDirection(direction, board.get(row, col));
      switch (direction) {
        case "north":
          row--;
          break;
        case "south":
          row++;
          break;
        case "east":
          col++;
          break;
        case "west":
          col--;
          break;
      }

      steps++;
    }
  }

  return Object.values(mapping).reduce((prev, curr) => Math.max(prev, curr), 0);
};

const getStartChar = (dir1, dir2) => {
  switch (dir1) {
    case "north":
      switch (dir2) {
        case "south":
          return "|";
        case "east":
          return "L";
        case "west":
          return "J";
      }

    case "south":
      switch (dir2) {
        case "north":
          return "|";
        case "east":
          return "F";
        case "west":
          return "7";
      }

    case "east":
      switch (dir2) {
        case "north":
          return "L";
        case "south":
          return "F";
        case "west":
          return "-";
      }

    case "west":
      switch (dir2) {
        case "north":
          return "J";
        case "south":
          return "7";
        case "east":
          return "-";
      }
  }
};

const solution2 = (input) => {
  const [board, starts] = parse(input);
  const startChar = getStartChar(starts[0][2], starts[1][2]);

  const pipes = input.split("\n").map((r) => r.split("").map((_) => " "));

  let [row, col, direction] = starts[0];
  while (board.get(row, col) != "S") {
    pipes[row][col] = board.get(row, col);

    direction = nextDirection(direction, board.get(row, col));
    switch (direction) {
      case "north":
        row--;
        break;
      case "south":
        row++;
        break;
      case "east":
        col++;
        break;
      case "west":
        col--;
        break;
    }
  }

  pipes[row][col] = startChar;

  // Walk row-wise, every time we cross a pipe, we switch inside/outside
  // Count all the spaces we see when we're inside
  let enclosed = 0;
  for (let r = 0; r < pipes.length; r++) {
    // We don't care about horizontal pipes
    let pipeRow = pipes[r].filter((p) => p != "-").join("");

    // L7 and FJ can be simplified to a single pipe
    pipeRow = pipeRow.replace(/L7/g, "|");
    pipeRow = pipeRow.replace(/FJ/g, "|");

    // LJ and F7 can be simplified to || which can be removed
    pipeRow = pipeRow.replace(/LJ/g, "");
    pipeRow = pipeRow.replace(/F7/g, "");

    // Count all the spaces we see when we're inside
    let inside = false;
    for (const pipe of pipeRow) {
      if (pipe == " ") {
        if (inside) {
          enclosed++;
        }
        continue;
      }

      if (pipe == "|") {
        inside = !inside;
      }
    }
  }

  return enclosed;
};

example("Part1", solution1, testInput, 8);
answer("Part1", solution1);

example("Part2", solution2, testInput2, 8);
example("Part2", solution2, testInput3, 10);
answer("Part2", solution2);
