const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

const testInput2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

const solution1 = (input) => {
  const [registers, program] = input.split("\n\n");
  let [A] = registers.split("\n").map((r) => parseInt(r.split(": ")[1]));
  const instructions = program
    .substr(9)
    .split(",")
    .map((i) => parseInt(i))
    .map(BigInt);

  return machine(A, instructions).join(",");
};

const solution2 = (input) => {
  const [_, program] = input.split("\n\n");
  const instructions = program
    .substr(9)
    .split(",")
    .map((i) => parseInt(i))
    .map(BigInt);

  // After a lot of testing I noticed that the program iterates in a pattern. It's possible
  // to jump to the next iteration by multiplying the current index by 8. Then we need to
  // find the next correct number and jump to the next iteration.
  let idx = 0;
  let i = 0;

  while (true) {
    const results = machine(i, instructions);

    let matches = true;
    for (let k = 0; k <= idx; k++) {
      if (
        results[results.length - 1 - k] !=
        instructions[instructions.length - 1 - k]
      ) {
        matches = false;
      }
    }

    if (matches) {
      if (results.length === instructions.length) {
        return i;
      }
      i *= 8;
      idx++;
    } else {
      i += 1;
    }
  }
};

function machine(aRegistry, instructions) {
  let ip = 0;
  let A = BigInt(aRegistry);
  let B = BigInt(0);
  let C = BigInt(0);
  let outs = [];

  let combo = (ip) => {
    let val = instructions[ip + 1];
    if (val < 4n) {
      return val;
    }
    if (val == 4n) {
      return A;
    }
    if (val == 5n) {
      return B;
    }
    if (val == 6n) {
      return C;
    }
    throw new Error("Invalid opcode");
  };

  while (ip < instructions.length) {
    const instr = instructions[ip];
    switch (instr) {
      case 0n:
        A = BigInt(A / BigInt(Math.pow(2, Number(combo(ip)))));
        break;
      case 1n:
        B = B ^ instructions[ip + 1];
        break;
      case 2n:
        B = combo(ip) % 8n;
        break;
      case 3n:
        if (A != 0n) {
          ip = Number(instructions[ip + 1]) - 2;
        }
        break;
      case 4n:
        B = B ^ C;
        break;
      case 5n:
        outs.push(combo(ip) % 8n);
        break;
      case 6n:
        B = BigInt(A / BigInt(Math.pow(2, Number(combo(ip)))));
        break;
      case 7n:
        C = BigInt(A / BigInt(Math.pow(2, Number(combo(ip)))));
        break;
    }
    ip += 2;
  }
  return outs;
}

example("Part1", solution1, testInput, "4,6,3,5,6,3,5,2,1,0");
answer("Part1", solution1);

example("Part2", solution2, testInput2, 117440);
answer("Part2", solution2);
