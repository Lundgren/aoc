const { inputStr, utils, answers } = require('./helper.js');

const TYPES = {
  0: 'sum',
  1: 'product',
  2: 'minimum',
  3: 'maximum',
  4: 'literal',
  5: 'gt',
  6: 'lt',
  7: 'eq',
};

class BinaryReader {
  pos = 0;
  constructor(input) {
    this.code = input
      .split('')
      .map((n) => parseInt(n, 16).toString(2).padStart(4, '0'))
      .join('');
  }
  consume(bits) {
    this.pos += bits;
    return this.code.substring(this.pos - bits, this.pos);
  }
  consumeInt(bits) {
    return parseInt(this.consume(bits), 2);
  }
}

const parse = (reader) => {
  let package = {
    version: reader.consumeInt(3),
    type: TYPES[reader.consumeInt(3)],
    value: null,
    packages: [],
  };

  if (package.type == 'literal') {
    let lastVal = false;
    let literal = '';
    while (!lastVal) {
      lastVal = reader.consume(1) == '0';
      literal += reader.consume(4);
    }
    package.value = parseInt(literal, 2);
  } else {
    if (reader.consume(1) == '0') {
      const subPackageEndPos = reader.consumeInt(15) + reader.pos;
      while (reader.pos < subPackageEndPos) {
        package.packages.push(parse(reader));
      }
    } else {
      const subPackages = reader.consumeInt(11);
      for (let i = 0; i < subPackages; i++) {
        package.packages.push(parse(reader));
      }
    }
  }

  return package;
};

const process = (input, executeFn) => {
  const ast = parse(new BinaryReader(input));
  return executeFn(ast);
};

const summarize = ({ version, packages }) => {
  return version + packages.map(summarize).reduce((sum, v) => sum + v, 0);
};

const calculate = ({ type, packages, value }) => {
  const subValues = packages.map(calculate);
  switch (type) {
    case 'sum':
      return subValues.reduce((sum, v) => sum + v, 0);
    case 'product':
      return subValues.reduce((sum, v) => sum * v, 1);
    case 'minimum':
      return Math.min(...subValues);
    case 'maximum':
      return Math.max(...subValues);
    case 'literal':
      return value;
    case 'gt':
      return subValues[0] > subValues[1] ? 1 : 0;
    case 'lt':
      return subValues[0] < subValues[1] ? 1 : 0;
    case 'eq':
      return subValues[0] == subValues[1] ? 1 : 0;
  }
};

utils.example(process('8A004A801A8002F478', summarize), 16);
utils.example(process('620080001611562C8802118E34', summarize), 12);
utils.example(process('C0015000016115A2E0802F182340', summarize), 23);
utils.example(process('A0016C880162017C3686B18A3D4780', summarize), 31);
const part1 = process(inputStr, summarize);

utils.example(process('C200B40A82', calculate), 3);
utils.example(process('04005AC33890', calculate), 54);
utils.example(process('880086C3E88112', calculate), 7);
utils.example(process('CE00C43D881120', calculate), 9);
utils.example(process('D8005AC2A8F0', calculate), 1);
utils.example(process('F600BC2D8F', calculate), 0);
utils.example(process('9C005AC2F8F0', calculate), 0);
utils.example(process('9C0141080250320F1802104A08', calculate), 1);
const part2 = process(inputStr, calculate);

answers(part1, part2);
