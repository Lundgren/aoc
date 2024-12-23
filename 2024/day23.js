const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

const solution1 = (input) => {
  let ans = 0;

  const connStr = input.split("\n").map((l) => l.split("-"));
  const connections = {};
  for (const [a, b] of connStr) {
    if (!(a in connections)) {
      connections[a] = [];
    }
    if (!(b in connections)) {
      connections[b] = [];
    }
    connections[a].push(b);
    connections[b].push(a);
  }

  const nodes = Object.keys(connections);

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      for (let k = j + 1; k < nodes.length; k++) {
        const [a, b, c] = [nodes[i], nodes[j], nodes[k]];

        if (
          connections[a].includes(b) &&
          connections[b].includes(c) &&
          connections[a].includes(c)
        ) {
            if (a.startsWith("t") || b.startsWith("t") || c.startsWith("t")) {
            ans++;
            }
        }
      }
    }
  }

  return ans;
};

const solution2 = (input) => {
  const connStr = input.split("\n").map((l) => l.split("-"));
  const connections = {};
  for (const [a, b] of connStr) {
    if (!(a in connections)) {
      connections[a] = [];
    }
    if (!(b in connections)) {
      connections[b] = [];
    }
    connections[a].push(b);
    connections[b].push(a);
  }

  const nodes = Object.keys(connections);
  let largestSet = [];

  const isConnected = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (!connections[nodes[i]].includes(nodes[j])) {
          return false;
        }
      }
    }

    return true;
  };

  const findLargestSet = (set, remainingNodes) => {
    if (set.length > largestSet.length && isConnected(set)) {
      largestSet = [...set];
    }

    for (let i = 0; i < remainingNodes.length; i++) {
      const newSet = [...set, remainingNodes[i]];
      const newRemaining = remainingNodes.slice(i + 1);

      if (isConnected(newSet)) {
        findLargestSet(newSet, newRemaining);
      }
    }
  };

  findLargestSet([], nodes);

  return largestSet.sort().join(",");
};

example("Part1", solution1, testInput, 7);
answer("Part1", solution1);

example("Part2", solution2, testInput, "co,de,ka,ta");
answer("Part2", solution2);
