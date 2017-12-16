const assert = require("assert");
const fs = require("fs");

const input = fs
  .readFileSync("./day16.input.txt")
  .toString("utf-8")
  .trim();

const swap = (lst, pos1, pos2) => {
  const tmp = lst[pos1];
  lst[pos1] = lst[pos2];
  lst[pos2] = tmp;
  return lst;
};

const dance = (movesInput, progsInput = "abcdefghijklmnop") => {
  let programs = progsInput.split("");
  const moves = movesInput.split(",");

  return moves.reduce((acc, move) => doMove(move, acc), programs).join("");
};

const doMove = (move, progs) => {
  const parts = move.split("");
  switch (parts[0]) {
    case "s":
      const pos = parseInt(move.substr(1));
      return [...progs.slice(-pos), ...progs.slice(0, -pos)];
    case "x":
      const idx1 = parseInt(move.substr(1).split("/")[0]);
      const idx2 = parseInt(move.substr(1).split("/")[1]);
      return swap(progs, idx1, idx2);
    case "p":
      const pos1 = progs.indexOf(parts[1]);
      const pos2 = progs.indexOf(parts[3]);
      return swap(progs, pos1, pos2);
  }
  return progs;
};

assert(dance("s1", "abcde") == "eabcd");
assert(dance("s1,x3/4", "abcde") == "eabdc");
assert(dance("s1,x3/4,pe/b", "abcde") == "baedc");

const result = dance(input);
console.log(`Program order after one dance: ${result}`);

const multipleDances = (moves, input, times) => {
  let programs = input;
  for (let i = 0; i < times; i++) {
    programs = dance(moves, programs);

    if (programs == input) {
      const timesLeft = times % (i + 1);
      return multipleDances(moves, input, timesLeft);
    }
  }
  return programs;
};

assert(multipleDances("s1,x3/4,pe/b", "abcde", 2) == "ceadb");

const resultMany = multipleDances(input, "abcdefghijklmnop", 1000000000);
console.log(`Program order after many dances: ${resultMany}`);
