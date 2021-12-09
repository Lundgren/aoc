const { inputStr, utils, answers } = require('./helper.js');

const testInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const countEasyDigits = (input) => {
  const digits = parse(input);
  return digits.reduce((acc, v) => {
    const easyDigits = v.output.reduce((a, v) => a + easyDigit(v), 0);
    return acc + easyDigits;
  }, 0);
};

const easyDigit = (str) => {
  return str.length == 2 || // 1
    str.length == 3 || // 7
    str.length == 4 || // 4
    str.length == 7 //8
    ? 1
    : 0;
};

const sumOutput = (str) => {
  const signals = parse(str);

  let total = 0;
  for (const sig of signals) {
    const mappings = findMappings([...sig.input, ...sig.output]);

    let sum = 0;
    for (const digit of sig.output) {
      sum *= 10;
      sum += digitToNumber(digit, mappings);
    }

    total += sum;
  }

  return total;
};

const parse = (str) => {
  return str.split('\n').map((i) => {
    const [input, output] = i.split(' | ');
    return {
      input: input.split(' ').map(sort),
      output: output.split(' ').map(sort),
    };
  });
};

const sort = (str) => str.split('').sort().join('');

const findMappings = (digits) => {
  let alternatives = utils.permute(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
  const m = alternatives.filter((a) => {
    for (const d of digits) {
      if (d.length == 2) {
        // 1
        if (!containsAll(d, a[2], a[5])) {
          return false;
        }
      } else if (d.length == 3) {
        // 7
        if (!containsAll(d, a[0], a[2], a[5])) {
          return false;
        }
      } else if (d.length == 4) {
        // 4
        if (!containsAll(d, a[1], a[2], a[3], a[5])) {
          return false;
        }
      } else if (d.length == 5) {
        // 2, 3 & 5
        if (!containsAll(d, a[0], a[3], a[6])) {
          return false;
        }
      } else if (d.length == 6) {
        // 0, 6 & 9
        if (!containsAll(d, a[0], a[1], a[5], a[6])) {
          return false;
        }
      }
    }
    return true;
  })[0];

  return [
    [m[0], m[1], m[2], m[4], m[5], m[6]], // 0
    [m[2], m[5]], // 1
    [m[0], m[2], m[3], m[4], m[6]], // 2
    [m[0], m[2], m[3], m[5], m[6]], // 3
    [m[1], m[2], m[3], m[5]], // 4
    [m[0], m[1], m[3], m[5], m[6]], // 5
    [m[0], m[1], m[3], m[4], m[5], m[6]], // 6
    [m[0], m[2], m[5]], // 7
    [m[0], m[1], m[2], m[3], m[4], m[5], m[6]], // 8
    [m[0], m[1], m[2], m[3], m[5], m[6]], // 9
  ].map((a) => sort(a.join('')));
};

const containsAll = (digit, ...lookups) => {
  for (const l of lookups) {
    if (!digit.includes(l)) {
      return false;
    }
  }
  return true;
};

const digitToNumber = (digit, mappings) => {
  for (let i = 0; i < mappings.length; i++) {
    if (digit == mappings[i]) {
      return i;
    }
  }
};

utils.example(countEasyDigits(testInput), 26);
const part1 = countEasyDigits(inputStr);

utils.example(sumOutput(testInput), 61229);
const part2 = sumOutput(inputStr);

answers(part1, part2);
