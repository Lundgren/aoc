const fs = require('fs');
const path = require('path');

// Try to guess the input file based on the initial scripts name
const readInput = () => {
  const inputPath = process.mainModule.filename.slice(0, -2) + 'input';
  if (fs.existsSync(inputPath)) {
    return fs.readFileSync(inputPath).toString('utf-8');
  }

  return '';
};

module.exports.inputStr = readInput();

let examplesFailed = false;
module.exports.utils = {
  example: (actual, expected) => {
    if (actual != expected) {
      examplesFailed = true;
      console.log(`Expected ${expected} but got ${actual}`);
    }
  },
  printMatrix: (what, fn = (x) => x) => {
    let res = what.map((row) => row.map((x) => fn(x)).join('')).join('\n');
    const out = path.dirname(process.mainModule.filename);
    fs.writeFileSync(out + '/temp.txt', res);
  },
};

module.exports.answers = (part1, part2) => {
  if (examplesFailed) {
    console.log('\nSome tests failed so these results might be invalid');
  }

  console.log(`Part1: ${part1}, Part2: ${part2}`);
};
