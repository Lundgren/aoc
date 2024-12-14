const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const parseCards = (cardStr) => {
  return cardStr.split("\n").map((row, idx) => {
    const [winning, numbers] = row.split(": ")[1].split(" | ");

    return {
      winning: [...winning.matchAll(/\d+/g)].map((r) => r[0]),
      numbers: [...numbers.matchAll(/\d+/g)].map((r) => r[0]),
      amount: 1,
      index: idx,
    };
  });
};

const solution1 = (input) => {
  const cards = parseCards(input);

  let totalPoints = 0;
  for (const card of cards) {
    let points = 0;
    for (const num of card.numbers) {
      if (card.winning.includes(num)) {
        points = points == 0 ? 1 : points * 2;
      }
    }

    totalPoints += points;
  }

  return totalPoints;
};

const solution2 = (input) => {
  const cards = parseCards(input);

  for (const card of cards) {
    let matches = 0;
    for (const num of card.numbers) {
      if (card.winning.includes(num)) {
        matches++;
      }
    }

    for (let i = card.index + 1; i < card.index + 1 + matches; i++) {
      cards[i].amount += card.amount;
    }
  }

  return cards.map((c) => c.amount).reduce((curr, prev) => curr + prev, 0);
};

example("Part1", solution1, testInput, 13);
answer("Part1", solution1);

example("Part2", solution2, testInput, 30);
answer("Part2", solution2);
