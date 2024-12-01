const fs = require('fs');
const path = require('path');

require('./utils/trace');

// Try to guess the input file based on the initial scripts name
const readInput = () => {
  const inputPath = process.mainModule.filename.slice(0, -2) + 'input';
  if (fs.existsSync(inputPath)) {
    return fs.readFileSync(inputPath).toString('utf-8').replaceAll('\r\n', '\n');
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
  printMatrixAppend: (what, title, fn = (x) => x) => {
    let res = what.map((row) => row.map((x) => fn(x)).join('')).join('\n');
    const out = path.dirname(process.mainModule.filename);
    fs.appendFileSync(out + '/temp.txt', `${title}\n${res}\n\n`);
  },
  permute: (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m);
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next));
        }
      }
    };

    permute(inputArr);

    return result;
  },
};

// const origLogger = console.log;
// let allLogs = []
// console.log = (what) => {

// }

module.exports.answers = (part1, part2) => {
  if (examplesFailed) {
    console.log('\nSome tests failed so these results might be invalid');
  }

  console.log(`Part1: ${part1}, Part2: ${part2}`);
};