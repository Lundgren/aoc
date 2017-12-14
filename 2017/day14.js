const assert = require("assert");

const INPUT = "nbysizxe";

function toLengths(input) {
  return input
    .split("")
    .map(x => x.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);
}

assert.deepEqual(toLengths("1,2,3"), [49, 44, 50, 44, 51, 17, 31, 73, 47, 23]);

function toHex(list) {
  return list.map(x => x.toString(16).padStart(2, "0")).join("");
}

assert.equal(toHex([64, 7, 255]), "4007ff");

function hash(input, rounds = 1) {
  let lengths = toLengths(input);
  let list = [...Array(256).keys()];
  let pos = 0;
  let skip = 0;

  for (let i = 0; i < 64; i++) {
    for (let length of lengths) {
      if (length > 1) {
        let temp = list.slice(pos).concat(list.slice(0, pos));
        temp = temp
          .slice(0, length)
          .reverse()
          .concat(temp.slice(length));
        list = temp.slice(-pos).concat(temp.slice(0, -pos));
      }
      pos = (pos + length + skip) % list.length;
      skip++;
    }
  }

  let hash = [];
  for (let i = 0; i < 16; i++) {
    hash.push(list.slice(i * 16, (i + 1) * 16).reduce((a, b) => a ^ b));
  }

  return toHex(hash);
}

assert.equal(hash("AoC 2017"), "33efeb34ea91902bb2f59c9920caa6cd");

function makeGrid(input) {
  const grid = [];

  for (let row = 0; row < 128; row++) {
    grid[row] = hash(`${input}-${row}`)
      .split("")
      .map(i =>
        parseInt(i, 16)
          .toString(2)
          .padStart(4, "0")
      )
      .join("")
      .split("")
      .map(Number);
  }

  return grid;
}

assert.deepEqual(makeGrid("flqrgnkx")[0].slice(0, 8), [1, 1, 0, 1, 0, 1, 0, 0]);

let grid = makeGrid(INPUT);

let squares = grid.reduce(
  (acc, row) => acc + row.reduce((acc, i) => acc + i, 0),
  0
);
console.log(`Grid contains ${squares} squares`);

function isGroup(row, col) {
  return row >= 0 && row < 128 && col >= 0 && col < 128 && grid[row][col] == 1;
}

function removeGroup(row, col) {
  if (isGroup(row, col)) {
    grid[row][col] = 0;
    removeGroup(row + 1, col);
    removeGroup(row - 1, col);
    removeGroup(row, col + 1);
    removeGroup(row, col - 1);
    return 1;
  }

  return 0;
}

let groups = 0;
for (let r = 0; r < 128; r++) {
  for (let c = 0; c < 128; c++) {
    groups += removeGroup(r, c);
  }
}

console.log(`Grid contained ${groups} groups`);
