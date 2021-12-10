const { inputStr, utils, answers } = require('./helper.js');

const testInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const OPEN_CHARS = ['(', '[', '{', '<'];
const CHAR_MATCH = { '(': ')', '[': ']', '{': '}', '<': '>' };

const syntaxErrorScoreFor = (input) => {
  const code = input.split('\n').map((l) => l.split(''));

  return code.reduce((acc, l) => acc + errorScore(l), 0);
};

const autocompleteScoreFor = (input) => {
  const CHAR_SCORE = { '(': 1, '[': 2, '{': 3, '<': 4 };
  const code = input
    .split('\n')
    .map((l) => l.split(''))
    .filter((l) => errorScore(l) == 0);

  let scores = [];
  for (const line of code) {
    const stack = [];
    for (const char of line) {
      if (OPEN_CHARS.includes(char)) {
        stack.push(char);
      } else {
        stack.pop();
      }
    }

    let score = 0;
    while (stack.length != 0) {
      const char = stack.pop();
      score *= 5;
      score += CHAR_SCORE[char];
    }
    scores.push(score);
  }

  return scores[Math.floor(scores.length / 2)];
};

const errorScore = (line) => {
  const CHAR_SCORE = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

  const stack = [];
  for (const char of line) {
    if (OPEN_CHARS.includes(char)) {
      stack.push(char);
    } else {
      const expected = stack.pop();
      if (char != CHAR_MATCH[expected]) {
        return CHAR_SCORE[char];
      }
    }
  }
  return 0;
};

utils.example(syntaxErrorScoreFor(testInput), 26397);
const part1 = syntaxErrorScoreFor(inputStr);

utils.example(autocompleteScoreFor(testInput), 288957);
const part2 = autocompleteScoreFor(inputStr);

answers(part1, part2);
