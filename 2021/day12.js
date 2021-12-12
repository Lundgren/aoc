const { inputStr, utils, answers } = require('./helper.js');

const testInput1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const testInput2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const testInput3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

const findUniquePaths = (input, validPathFn) => {
  const caveSystem = parseToGraph(input);

  const ongoing = [[caveSystem['start']]];
  const completed = [];

  while (ongoing.length > 0) {
    const path = ongoing.pop();
    const lastCave = path[path.length - 1];
    for (const neighbor of lastCave.neighbors) {
      if (validPathFn([...path, neighbor])) {
        if (neighbor.isEnd) {
          completed.push([...path, neighbor]);
        } else {
          ongoing.push([...path, neighbor]);
        }
      }
    }
  }

  return completed.length;
};

const isValidPath1 = (path) => {
  const visitedSmallCaves = {};
  for (const cave of path) {
    if (!cave.isBig) {
      if (cave.id in visitedSmallCaves) {
        return false;
      }
      visitedSmallCaves[cave.id] = true;
    }
  }
  return true;
};

const isValidPath2 = (path) => {
  const visited = { start: 0, end: 0 };
  for (const cave of path) {
    visited[cave.id] = (visited[cave.id] || 0) + 1;
  }

  const smallCavesVisitedTwice = Object.entries(visited).filter(
    ([id, num]) => !isBigCave(id) && num == 2
  ).length;
  const smallCavesVisitedMore = Object.entries(visited).filter(
    ([id, num]) => !isBigCave(id) && num > 2
  ).length;

  return (
    visited['start'] == 1 &&
    visited['end'] <= 1 &&
    smallCavesVisitedTwice <= 1 &&
    smallCavesVisitedMore == 0
  );
};

const parseToGraph = (input) => {
  const nodes = {};
  input.split('\n').forEach((path) => {
    path.split('-').forEach((node) => {
      if (!(node in nodes)) {
        nodes[node] = {
          id: node,
          isBig: isBigCave(node),
          isEnd: node == 'end',
          neighbors: [],
        };
      }
    });
  });

  input.split('\n').forEach((path) => {
    const [from, to] = path.split('-');
    nodes[from].neighbors.push(nodes[to]);
    nodes[to].neighbors.push(nodes[from]);
  });

  return nodes;
};

const isBigCave = (c) => c == c.toUpperCase();

utils.example(findUniquePaths(testInput1, isValidPath1), 10);
utils.example(findUniquePaths(testInput2, isValidPath1), 19);
utils.example(findUniquePaths(testInput3, isValidPath1), 226);
const part1 = findUniquePaths(inputStr, isValidPath1);

utils.example(findUniquePaths(testInput1, isValidPath2), 36);
utils.example(findUniquePaths(testInput2, isValidPath2), 103);
utils.example(findUniquePaths(testInput3, isValidPath2), 3509);
const part2 = findUniquePaths(inputStr, isValidPath2);

answers(part1, part2);
