const { inputStr, utils, answers } = require('./helper.js');

const testInput = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

// "priority queue"
Array.prototype.priorityNext = function () {
  return this.sort((a, b) => a.risk - b.risk).shift();
};

const findSafestPath = (input) => {
  const startNode = parseGraph(input);

  const queue = [{ risk: 0, path: [startNode.id], node: startNode }];
  const dist = { [startNode.id]: 0 };

  while (queue.length > 0) {
    const u = queue.priorityNext();

    if (u.node.end) {
      return u.risk;
    }

    for (const p of u.node.paths) {
      const alt = u.risk + p.risk;
      if (!(p.id in dist) || alt < dist[p.id]) {
        dist[p.id] = alt;
        queue.push({ risk: u.risk + p.risk, path: [...u.path, p.id], node: p });
      }
    }
  }
};

const parseGraph = (input) => {
  const id = (row, col) => row * 10000 + col;
  const nodes = {};

  const rows = input.split('\n');
  for (let row = 0; row < rows.length; row++) {
    const cols = rows[row].split('').map(Number);
    for (let col = 0; col < cols.length; col++) {
      nodes[id(row, col)] = { id: id(row, col), risk: cols[col], paths: [] };
    }
  }
  nodes[id(rows.length - 1, rows[0].length - 1)].end = true;

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
      const node = nodes[id(row, col)];
      if (id(row - 1, col) in nodes) {
        node.paths.push(nodes[id(row - 1, col)]);
      }
      if (id(row, col + 1) in nodes) {
        node.paths.push(nodes[id(row, col + 1)]);
      }
      if (id(row + 1, col) in nodes) {
        node.paths.push(nodes[id(row + 1, col)]);
      }
      if (id(row, col - 1) in nodes) {
        node.paths.push(nodes[id(row, col - 1)]);
      }
    }
  }

  return nodes[id(0, 0)];
};

const extend5Times = (input) => {
  const res = [];
  const rows = input.split('\n');
  for (let row = 0; row < rows.length; row++) {
    const original = rows[row].split('').map(Number);
    const extended = [];
    for (let i = 0; i < 5; i++) {
      for (const n of original) {
        extended.push(n + i < 10 ? n + i : ((n + i) % 10) + 1);
      }
    }
    res.push(extended);
  }

  const result = [];
  for (let i = 0; i < 5; i++) {
    for (const row of res) {
      result.push(row.map((n) => (n + i < 10 ? n + i : ((n + i) % 10) + 1)));
    }
  }

  return result.map((row) => row.join('')).join('\n');
};

utils.example(findSafestPath(testInput), 40);
const part1 = findSafestPath(inputStr);

utils.example(findSafestPath(extend5Times(testInput)), 315);
const part2 = findSafestPath(extend5Times(inputStr));

answers(part1, part2);
