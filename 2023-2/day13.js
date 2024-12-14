const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const calculateDiff = (pattern1, pattern2) => {
  let diff = 0;
  for (let i = 0; i < pattern1.length; i++) {
    if (pattern1[i] !== pattern2[i]) {
      diff++;
    }
  }
  return diff;
};

const getHorizontalMirror = (pattern, wantedDiff = 0) => {
  const rows = pattern.split("\n");
  for (let i = 0; i < rows.length - 1; i++) {
    let mirror = true;
    let diff = 0;
    for (let j = 0; i + j + 1 < rows.length && i - j >= 0; j++) {
      diff += calculateDiff(rows[i - j], rows[i + j + 1]);
      if (diff > wantedDiff) {
        mirror = false;
        break;
      }
    }

    if (mirror && diff == wantedDiff) {
      return {
        mirror: true,
        row: i + 1,
      };
    }
  }

  return { mirror: false };
};

const getVerticalMirror = (pattern, wantedDiff = 0) => {
  return getHorizontalMirror(turn90Degrees(pattern), wantedDiff);
};

const turn90Degrees = (pattern) => {
  let flipped = "";
  const rows = pattern.split("\n");
  for (let i = 0; i < rows[0].length; i++) {
    for (let j = rows.length - 1; j >= 0; j--) {
      flipped += rows[j][i];
    }
    flipped += "\n";
  }
  return flipped.substring(0, flipped.length - 1);
};

const solution1 = (input) => {
  const patterns = (input = input.split("\n\n"));

  let score = 0;
  for (const pattern of patterns) {
    // Check for horizontal mirrorings
    let res = getHorizontalMirror(pattern);
    if (res.mirror) {
      score += res.row * 100;
      continue;
    }

    // Check for vertical mirrorings
    res = getVerticalMirror(pattern);
    if (res.mirror) {
      score += res.row;
    }
  }

  return score;
};

const solution2 = (input) => {
  const patterns = (input = input.split("\n\n"));

  let score = 0;
  for (const pattern of patterns) {
    // Check for horizontal mirrorings
    let res = getHorizontalMirror(pattern, 1);
    if (res.mirror) {
      score += res.row * 100;
      continue;
    }

    // Check for vertical mirrorings
    res = getVerticalMirror(pattern, 1);
    if (res.mirror) {
      score += res.row;
    }
  }

  return score;
};

example("Part1", solution1, testInput, 405);
answer("Part1", solution1);

example("Part2", solution2, testInput, 400);
answer("Part2", solution2);
