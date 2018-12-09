const fs = require("fs");

const input = fs
  .readFileSync("./day8.input")
  .toString("utf-8")
  .split(' ')
  .map(Number);

const testInput = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]

const parseNode = (nbrs) =>{
  const nbrChildren = nbrs.shift()
  const nbrMeta = nbrs.shift()

  const children = []
  for (let i = 0; i < nbrChildren; i++) {
    [nbrs, child] = parseNode(nbrs)
    children.push(child);
  }

  const meta = nbrs.splice(0, nbrMeta)
  return [nbrs, { children: children, meta: meta }];
}

const countPart1 = (node) => {
  const childSum = node.children.reduce((prev, n) => prev + countPart1(n), 0);
  const metaSum = node.meta.reduce((a, b) => a + b)
  return childSum + metaSum
}

const countPart2 = (node) => {
  if (node.children.length == 0) {
    return node.meta.reduce((a, b) => a + b)
  }

  return node.meta.reduce((prev, m) => {
    if (m < 1 || m > node.children.length) {
      return prev
    }
    return prev + countPart2(node.children[m - 1])
  }, 0)
}

const [_, head] = parseNode(testInput)
console.log(`Part 1: ${countPart1(head)}`)
console.log(`Part 2: ${countPart2(head)}`)