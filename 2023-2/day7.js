const { example, answer, inputStr } = require("../utils/helper.js");

const testInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const FIVE_OF_A_KIND = 6;
const FOUR_OF_A_KIND = 5;
const FULL_HOUSE = 4;
const THREE_OF_A_KIND = 3;
const TWO_PAIRS = 2;
const ONE_PAIR = 1;
const NOTHING = 0;

const toCardNumber = (char) => {
  switch (char) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 11;
    case "T":
      return 10;
  }

  return parseInt(char);
};

const scoreFunc = (hand) => {
  const counts = new Array(15).fill(0);
  hand.forEach((card) => {
    counts[card] = counts[card] + 1;
  });

  if (counts.includes(5)) {
    return FIVE_OF_A_KIND;
  }
  if (counts.includes(4)) {
    return FOUR_OF_A_KIND;
  }
  if (counts.includes(3) && counts.includes(2)) {
    return FULL_HOUSE;
  }
  if (counts.includes(3)) {
    return THREE_OF_A_KIND;
  }
  if (counts.filter((c) => c === 2).length === 2) {
    return TWO_PAIRS;
  }
  if (counts.includes(2)) {
    return ONE_PAIR;
  }

  return NOTHING;
};

const scoreWithWildFunc = (hand) => {
  const filteredHand = hand.filter((c) => c != 0);
  const score = scoreFunc(filteredHand);
  const wildCards = 5 - filteredHand.length;

  if (wildCards == 0) {
    return score;
  }

  switch (score) {
    case FOUR_OF_A_KIND:
      return FIVE_OF_A_KIND;

    case THREE_OF_A_KIND:
      if (wildCards == 2) {
        return FIVE_OF_A_KIND;
      }
      return FOUR_OF_A_KIND;

    case TWO_PAIRS:
      return FULL_HOUSE;

    case ONE_PAIR:
      if (wildCards == 3) {
        return FIVE_OF_A_KIND;
      }
      if (wildCards == 2) {
        return FOUR_OF_A_KIND;
      }
      return THREE_OF_A_KIND;

    case NOTHING:
      switch (wildCards) {
        case 5:
        case 4:
          return FIVE_OF_A_KIND;
        case 3:
          return FOUR_OF_A_KIND;
        case 2:
          return THREE_OF_A_KIND;
        case 1:
          return ONE_PAIR;
      }
  }

  return score;
};

const resultCompareFn = (a, b) => {
  if (a.score < b.score) {
    return -1;
  } else if (b.score < a.score) {
    return 1;
  }

  for (let c = 0; c < 5; c++) {
    if (a.hand[c] < b.hand[c]) {
      return -1;
    } else if (b.hand[c] < a.hand[c]) {
      return 1;
    }
  }

  return 0;
};

const solution1 = (input) => {
  const hands = input.split("\n").map((s) => {
    const [cards, bet] = s.split(" ");
    const hand = cards.split("").map(toCardNumber);

    return {
      score: scoreFunc(hand),
      hand,
      bet,
    };
  });

  hands.sort(resultCompareFn);

  let score = 0;
  for (let i = 0; i < hands.length; i++) {
    score += (i + 1) * hands[i].bet;
  }

  return score;
};

const solution2 = (input) => {
  const hands = input
    .replaceAll("J", "0")
    .split("\n")
    .map((s) => {
      const [cards, bet] = s.split(" ");
      const hand = cards.split("").map(toCardNumber);

      return {
        score: scoreWithWildFunc(hand),
        hand,
        bet,
      };
    });

  hands.sort(resultCompareFn);

  let score = 0;
  for (let i = 0; i < hands.length; i++) {
    score += (i + 1) * hands[i].bet;
  }

  return score;
};

example("Part1", solution1, testInput, 6440);
answer("Part1", solution1);

example("Part2", solution2, testInput, 5905);
answer("Part2", solution2);
