const { inputStr, utils, answers } = require('./helper.js');

const testInput = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

const calculateMagnitude = (input) => {
  const numbers = input.split('\n').map((n) => parse(n.split('')));
  let sum = numbers[0];
  for (const number of numbers.slice(1)) {
    sum = { left: sum, right: number };
    reduce(sum);
  }
  return magnitude(sum);
};

const findMaxMagnitude = (input) => {
  const numbers = input.split('\n');

  let max = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i != j) {
        const sum = {
          left: parse(numbers[i].split('')),
          right: parse(numbers[j].split('')),
        };
        reduce(sum);
        max = Math.max(max, magnitude(sum));
      }
    }
  }

  return max;
};

const magnitude = (node) => {
  if (node.val != undefined) {
    return node.val;
  }

  return 3 * magnitude(node.left) + 2 * magnitude(node.right);
};

const reduce = (tree) => {
  let didReduction = false;
  do {
    // If any pair is nested inside four pairs, the leftmost such pair explodes.
    didReduction = explode(tree).exploded;

    // If any regular number is 10 or greater, the leftmost such regular number splits.
    didReduction = didReduction || split(tree);
  } while (didReduction);
};

const explode = (node, depth = 0) => {
  if (node.val != undefined) {
    return { exploded: false };
  }

  if (depth >= 4) {
    const left = node.left.val;
    delete node.left;
    const right = node.right.val;
    delete node.right;
    node.val = 0;
    return { exploded: true, left, right };
  }

  let res = explode(node.left, depth + 1);
  if (res.exploded) {
    if (res.right) {
      addToFirstLeft(node.right, res.right);
    }
    return { exploded: true, left: res.left };
  }

  res = explode(node.right, depth + 1);
  if (res.exploded) {
    if (res.left) {
      addToFirstRight(node.left, res.left);
    }
    return { exploded: true, right: res.right };
  }

  return { exploded: false };
};

const addToFirstLeft = (node, val) => {
  if (node.val != undefined) {
    node.val += val;
  } else {
    addToFirstLeft(node.left, val);
  }
};

const addToFirstRight = (node, val) => {
  if (node.val != undefined) {
    node.val += val;
  } else {
    addToFirstRight(node.right, val);
  }
};

const split = (node) => {
  if (node.val != undefined) {
    if (node.val >= 10) {
      node.left = { val: Math.floor(node.val / 2) };
      node.right = { val: Math.ceil(node.val / 2) };
      delete node.val;
      return true;
    }
    return false;
  }

  return split(node.left) || split(node.right);
};

const parse = (input) => {
  const res = { left: null, right: null };
  while (true) {
    const ch = input.shift();
    switch (ch) {
      case '[':
        res.left = parse(input);
        break;
      case ',':
        res.right = parse(input);
        break;
      case ']':
        return res;
      default:
        return { val: parseInt(ch) };
    }
  }
};

utils.example(calculateMagnitude(testInput), 4140);
const part1 = calculateMagnitude(inputStr);

utils.example(findMaxMagnitude(testInput), 3993);
const part2 = findMaxMagnitude(inputStr);

answers(part1, part2);
