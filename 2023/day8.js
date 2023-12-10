const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const testInput2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const parse = (input) => {
  const [instructionStr, graphStr] = input.split("\n\n");
  const instructions = instructionStr.split("");

  const network = {};
  graphStr.split("\n").forEach((row) => {
    const [from, left, right] = row
      .replaceAll(" = (", ", ")
      .replaceAll(")", "")
      .split(", ");

    network[from] = { L: left, R: right };
  });

  return [network, instructions];
};

const solution1 = (input) => {
  const [network, instructions] = parse(input);

  let steps = 0;
  let pos = "AAA";
  while (pos != "ZZZ") {
    const instruction = instructions[steps % instructions.length];
    pos = network[pos][instruction];
    steps++;
  }

  return steps;
};

function leastCommonMultiple(cycles) {
  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }

  return cycles.reduce((a, b) => (a * b) / gcd(a, b));
}

const solution2 = (input) => {
  // const [instructionStr, graphStr] = input.split("\n\n");
  // const instructions = instructionStr.split("");

  // const startNodes = [];
  // const network = {};
  // graphStr.split("\n").forEach((row) => {
  //   const [from, left, right] = row
  //     .replaceAll(" = (", ", ")
  //     .replaceAll(")", "")
  //     .split(", ");

  //   network[from] = { L: left, R: right };
  //   if (from.endsWith("A")) {
  //     startNodes.push(from);
  //   }
  // });
  const [network, instructions] = parse(input);
  const startNodes = Object.keys(network).filter((n) => n.endsWith("A"));

  const cycles = [];
  for (let i = 0; i < startNodes.length; i++) {
    let steps = 0;
    let pos = startNodes[i];
    while (!pos.endsWith("Z")) {
      const instruction = instructions[steps % instructions.length];
      pos = network[pos][instruction];
      steps++;
    }

    cycles.push(steps);
  }

  return leastCommonMultiple(cycles);
};

example("Part1", solution1, testInput, 6);
answer("Part1", solution1);

example("Part2", solution2, testInput2, 6);
answer("Part2", solution2);
